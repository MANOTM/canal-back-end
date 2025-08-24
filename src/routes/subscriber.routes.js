import express from 'express';
import { addSubscriber, getSubscribers } from '../controllers/subscriber.controller.js';

const router = express.Router();

// Add a new subscriber
router.post('/', addSubscriber);

// Get all subscribers
router.get('/', getSubscribers);

export default router;
