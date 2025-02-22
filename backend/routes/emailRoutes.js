import express from 'express';
import { syncEmails } from '../controllers/emailControllers.js';

const router = express.Router();

router.get('/sync', syncEmails);

export default router;