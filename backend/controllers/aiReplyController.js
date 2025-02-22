import { generateSuggestedReply } from "../services/aiReplyService.js";

export const aiReplyHandler = async (req, res) => {
    try {
        const { emailText } = req.body;
        if (!emailText) {
            return res.status(400).json({ error: "Missing email text" });
        }

        const reply = await generateSuggestedReply(emailText);
        res.json({ suggestedReply: reply });
    } catch (error) {
        res.status(500).json({
            error: "AI Reply Error",
            details: error.message,
        });
    }
};
