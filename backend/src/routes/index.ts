import { Router } from 'express';

const router = Router();

// Define your API routes here
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to Careerpilot AI API' });
});

export default router;
