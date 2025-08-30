import Contact from "../models/contact.model.js";  

// Regex for basic email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export async function newContact(req, res, next) {
  try {
    const { email, name, tel,objet,msg,articleId,type } = req.body;

    if (!name || !email || !type) {
      return res
        .status(400)
        .json({ message: "Name and email are required" });
    }
    // Validate email format

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
 
    // Save to DB

    const contact = new Contact({
      name,
      email,
      tel: tel || undefined, // will use default if not provided
      objet: objet || undefined,
      msg: msg || undefined,
      articleId: articleId || undefined,
      type,
    });

    const savedContact = await contact.save(); 

    res.status(201).json({
      message: "New contact created successfully",
      contact: savedContact,
    });
  } catch (err) {
    next(err);
  }
}
