import { generateSuggestedReply, storeKnowledge } from '../services/aiReplyService.js';
import esClient from '../config/elasticsearchClient.js';


export const suggestReply = async (req, res) => {
    try {
        const { messageId } = req.body;

        if (!messageId) {
            return res.status(400).json({ error: 'Message ID is required' });
        }

        // Fetch email from Elasticsearch
        const emailResponse = await esClient.get({
            index: 'emails',
            id: messageId,
        });

        console.log("Fetched email data:", emailResponse);
        
        if (!emailResponse.found) {
            return res.status(400).json({ error: 'Invalid email data' });
        }

        const emailData = emailResponse._source;
        const emailText = emailData.text || emailData.body || emailData.content || emailData.message;


        if (!emailText) {
            return res.status(400).json({ error: 'Email content not found' });
        }

        // Generate suggested reply using the email text
        const suggestedReply = await generateSuggestedReply(emailText);

        res.json({
            suggestedReply,
            email: { ...emailData, id: messageId }  // Ensure full email data is sent
        });
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