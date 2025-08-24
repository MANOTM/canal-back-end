import Subscriber from "../models/subscriber.model.js";

// Regex for basic email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Add a new subscriber
export async function addSubscriber(req, res, next) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    // Validate email format

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    // Check if email already exists
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    const subscriber = new Subscriber({ email });
    const savedSubscriber = await subscriber.save();

    res
      .status(201)
      .json({
        message: "Subscribed successfully",
        subscriber: savedSubscriber,
      });
  } catch (err) {
    next(err);
  }
}

// Get all subscribers
export async function getSubscribers(req, res, next) {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (err) {
    next(err);
  }
}
