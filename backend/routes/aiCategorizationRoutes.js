import express from 'express';
import { categorizeEmailManually } from '../controllers/aiCategorizationController.js';

const router = express.Router();

router.post('/categorize/:messageId', categorizeEmailManually);

export default router;