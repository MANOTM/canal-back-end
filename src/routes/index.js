import { Router } from 'express';
import articleRoutes from './article.routes.js';
import subscriberRoutes from './subscriber.routes.js';
import commandeRouter from './commande.routes.js';
import contactRoutes from './contact.routes.js';

const router = Router();

// (simple ping route)
router.get('/', (req, res) => {
  res.json({ ok: true });
});

// Article routes
router.use('/article', articleRoutes); 
router.use('/subscribers', subscriberRoutes); 
router.use('/commande', commandeRouter); 
router.use('/contact', contactRoutes); 

export default router;
