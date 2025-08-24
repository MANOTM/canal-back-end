import { Router } from 'express';
import articleRoutes from './article.routes.js';
import subscriberRoutes from './subscriber.routes.js';

const router = Router();

// (simple ping route)
router.get('/', (req, res) => {
  res.json({ ok: true });
});

// Article routes
router.use('/article', articleRoutes); 
router.use('/subscribers', subscriberRoutes);

export default router;
