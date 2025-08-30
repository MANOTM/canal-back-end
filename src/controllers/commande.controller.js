import Commande from "../models/commande.model.js"; 
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// Regex for basic email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Add a new subscriber
export async function addCommande(req, res, next) {
  try {
    const { email, name, tel } = req.body;

    if (!name || !email || !req.file) {
      return res
        .status(400)
        .json({ message: "Name, email, and image are required" });
    }
    // Validate email format

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path);

    // Save Commande to DB

    const commande = new Commande({
      name,
      email,
      tel: tel || undefined, // will use default if not provided
      img: result.secure_url,
    });

    const savedCommande = await commande.save(); 

    res.status(201).json({
      message: "Commande added successfully",
      commande: savedCommande,
    });
  } catch (err) {
    next(err);
  }
}
