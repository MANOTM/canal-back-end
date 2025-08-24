import { Router } from "express";
import multer from 'multer';
import {
  getArticlesPaginated,
  getArticleByName,
  createArticle,
  getArticlesFiltered 
} from "../controllers/article.controller.js";

const upload = multer({ storage: multer.diskStorage({}) });
const router = Router();

// GET paginated articles
// router.get("/", getArticlesPaginated);

// GET filtered & searched articles paginated
router.get('/', getArticlesFiltered);

// GET /api/articles/:name → single article by name
router.get("/:name", getArticleByName);

// POST /api/articles → create new article
router.post("/",upload.single('mainImg'),createArticle);

export default router;
