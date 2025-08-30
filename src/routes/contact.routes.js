import { Router } from "express"; 
import { 
  newContact,
} from "../controllers/contact.controller.js";
 

const router = Router();
 
// Route to create a new contact
router.post("/new", newContact);

export default router;
