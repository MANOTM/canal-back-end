import { Router } from "express";
import multer from "multer";
import {
  // getArticlesPaginated,
  getArticleByName,
  createArticle,
  getArticlesFiltered,
  searchArticles,
  getLatestArticles
} from "../controllers/article.controller.js";

const upload = multer({ storage: multer.diskStorage({}) });
const router = Router();

// GET paginated articles
// router.get("/", getArticlesPaginated);

// GET filtered & searched articles paginated
router.get("/", getArticlesFiltered);

// get 5 article max
router.get("/search", searchArticles);

// GET /api/article/latest → get latest 6 articles
router.get("/latest", getLatestArticles);

// GET /api/articles/:name → single article by name
router.get("/:name", getArticleByName);

// POST /api/articles → create new article
router.post("/", upload.single("mainImg"), createArticle);


export default router;
