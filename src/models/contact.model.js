import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    tel: {
      type: String,
      trim: true,
    },
    articleId: {
      type: String, 
      trim: true,
    },
    type: {
      type: String, 
      trim: true,
      required: true,
    },
    objet: {
      type: String, 
      trim: true, 
    },
    msg: {
      type: String, 
      trim: true, 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
