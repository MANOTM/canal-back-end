import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, 
    },
    mainImg: {
      type: String,
      required: true, 
      trim: true,
    }, 
    desc: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      default: () => Math.floor(Math.random() * (300 - 50 + 1)) + 50, // random between 50 and 300
      min: 0,
    },
  },
  { timestamps: true } 
);

export default mongoose.model('Article', articleSchema);
