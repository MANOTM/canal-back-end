import { Router } from "express";
import multer from "multer";
import { 
  addCommande
} from "../controllers/commande.controller.js";

const upload = multer({ storage: multer.diskStorage({}) });
const router = Router();
 
// POST /api/articles → create new article
router.post("/", upload.single("img"), addCommande);

export default router;
