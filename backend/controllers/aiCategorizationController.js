import esClient from "../config/elasticsearchClient.js";
import { categorizeAndStoreEmail } from "../services/aiCategorization.js";

export const categorizeEmailManually = async (req, res) => {
    try {
        const { messageId } = req.params;

        if (!messageId) {
            return res.status(400).json({ error: 'Message ID is required' });
        }

        const email = await esClient.get({ index: 'emails', id: messageId });

        if (!email.found) {
            return res.status(404).json({ error: 'Email not found' });
        }

        const category = await categorizeAndStoreEmail(email._source);
        res.json({ message: 'Email categorized', category });
    } catch (error) {
        console.error('Error categorizing email:', error);
        res.status(500).json({ error: 'Error categorizing email', details: error.message });
    }
};