import esClient from "../config/elasticsearchClient.js";
import { categorizeAndStoreEmail } from "../services/aiCategorization.js";

export const categorizeEmailManually = async (req, res) => {
    try {
        const { messageId } = req.params;

        if (!messageId) {
            return res.status(400).json({ error: 'Message ID is required' });
        }

        // Fetch email from Elasticsearch
        const emailResponse = await esClient.get({ index: 'emails', id: messageId });

        console.log("Fetched email from Elasticsearch:", emailResponse);

        // Validate email data
        if (!emailResponse.found || !emailResponse._source.text) {
            return res.status(400).json({ error: 'Invalid email data' });
        }

        // Ensure messageId is included in email data
        const email = {
            ...emailResponse._source,
            messageId: emailResponse._id // Assign Elasticsearch document ID as messageId
        };

        // Categorize and store the email
        const category = await categorizeAndStoreEmail(email);

        res.json({ message: 'Email categorized', category });
    } catch (error) {
        console.error('Error categorizing email:', error);
        res.status(500).json({ error: 'Error categorizing email', details: error.message });
    }
};
