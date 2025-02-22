import express from 'express';
import { suggestReply, addKnowledge } from '../controllers/aiReplyController.js';

const router = express.Router();

router.post('/suggest', suggestReply);
router.post('/add-knowledge', addKnowledge);

export default router;