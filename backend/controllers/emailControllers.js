import { startEmailSync } from "../services/emailService.js";
import esClient from "../config/elasticsearchClient.js";

export const syncEmails = async (req, res) => {
    try {
        await startEmailSync();
        res.json({ message: 'Email synchronization started.' });
    } catch (error) {
        console.error('Error starting email sync:', error);
        res.status(500).json({ error: 'Error starting email sync', details: error.message });
    }
};

export const getAllEmails = async (req, res) => {
    try {
        const { query } = req.query;

        const searchParams = query
            ? {
                index: "emails",
                body: {
                    query: {
                        match: { text: query },
                    },
                },
            }
            : { index: "emails", body: { query: { match_all: {} } } };

        const { hits } = await esClient.search(searchParams);

        const emails = hits.hits.map(hit => ({
            id: hit._id,
            ...hit._source,
        }));

        res.json(emails);
    } catch (error) {
        console.error("Error fetching emails:", error);
        res.status(500).json({ error: "Failed to fetch emails" });
    }
};