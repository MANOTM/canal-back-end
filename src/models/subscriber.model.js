import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // prevents duplicate subscriptions
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, 'Please enter a valid email'], // basic email validation
    },
  },
  { timestamps: true } // adds createdAt and updatedAt
);

export default mongoose.model('Subscriber', subscriberSchema);
