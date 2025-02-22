import { generateSuggestedReply, storeKnowledge } from '../services/aiReplyService.js';

export const suggestReply = async (req, res) => {
    try {
        const { emailText } = req.body;

        if (!emailText) {
            return res.status(400).json({ error: 'Email text is required' });
        }

        const reply = await generateSuggestedReply(emailText);
        res.json({ suggestedReply: reply });
    } catch (error) {
        console.error('Error generating reply:', error);
        res.status(500).json({ error: 'Error generating reply', details: error.message });
    }
};

export const addKnowledge = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: 'Text is required' });
        }

        await storeKnowledge(text);
        res.json({ message: 'Knowledge added successfully' });
    } catch (error) {
        console.error('Error storing knowledge:', error);
        res.status(500).json({ error: 'Error storing knowledge', details: error.message });
    }
};