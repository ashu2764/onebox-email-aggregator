import express from "express";
import { aiReplyHandler } from "../controllers/aiReplyController.js";

const router = express.Router();

router.post("/generate-reply", aiReplyHandler);

export default router;
