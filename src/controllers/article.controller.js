import Article from "../models/article.model.js";
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';


// GET /api/articles?page=1

// export async function getArticlesPaginated(req, res, next) {
//   try {
//     const limit = 9; // 9 articles per page
//     const totalArticles = await Article.countDocuments();
//     const totalPages = Math.ceil(totalArticles / limit) || 1;

//     // Get requested page
//     let page = parseInt(req.query.page) || 1;

//     // Validate page
//     if (page < 1 || page > totalPages) {
//       page = 1;
//     }

//     const skip = (page - 1) * limit;

//     const articles = await Article.find()
//       .sort({ createdAt: -1 }) // latest articles first
//       .skip(skip)
//       .limit(limit);

//     res.json({
//       page,
//       totalPages,
//       totalArticles,
//       articles,
//     });
//   } catch (err) {
//     next(err);
//   }
// }

// Get a single article by name
export async function getArticleByName(req, res, next) {
  try {
    const { name } = req.params;

    // Find article by exact name (case-sensitive)
    const article = await Article.findOne({ name: name.trim() });
    if (!article) return res.status(404).json({ message: "Article not found" });

    res.json(article);
  } catch (err) {
    next(err);
  }
}

// Create a new article
export async function createArticle(req, res, next) {
  try {
    const { name, desc, price } = req.body;

    if (!name || !desc || !req.file) {
      return res.status(400).json({ message: 'Name, description, and mainImg are required' });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path);

    const article = new Article({
      name,
      desc,
      price: price || undefined, // will use default if not provided
      mainImg: result.secure_url,
    });

    const savedArticle = await article.save();
    res.status(201).json(savedArticle);
  } catch (err) {
    next(err);
  }
}

// GET /api/articles?category=Tech&search=phone&page=1
export async function getArticlesFiltered(req, res, next) {
  try {
    const { category, search, page } = req.query;

    const limit = 9;
    let currentPage = parseInt(page) || 1;

    // Build filter object dynamically
    const filter = {};

    if (category && category !== 'All') {
      filter.category = { $regex: `^${category}$`, $options: 'i' };  
    }

    if (search && search.trim() !== "") {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { desc: { $regex: search, $options: 'i' } },
      ];
    }

    // Count total articles for this filter
    const totalArticles = await Article.countDocuments(filter);
    const totalPages = Math.ceil(totalArticles / limit) || 1;

    if (currentPage < 1 || currentPage > totalPages) {
      currentPage = 1;
    }

    const skip = (currentPage - 1) * limit;

    const articles = await Article.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      page: currentPage,
      totalPages,
      totalArticles,
      articles,
    });
  } catch (err) {
    next(err);
  }
}