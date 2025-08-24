// src/db/mongo.js
import mongoose from 'mongoose';
import { env } from '../config/index.js';

if (env.MONGO_URI) {
  mongoose
    .connect(env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => console.error('❌ MongoDB connection error:', err.message));
} else {
  console.warn('⚠️ No MONGO_URI provided in .env');
}
