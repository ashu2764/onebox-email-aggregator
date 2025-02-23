import express from 'express';
import { getAllEmails, syncEmails } from '../controllers/emailControllers.js';

const router = express.Router();

router.get('/sync', syncEmails);
router.get("/emails", getAllEmails);

export default router;