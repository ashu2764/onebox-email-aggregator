import { startEmailSync } from "../services/emailService.js";

export const syncEmails = async(req, res)=>{
    try {
        await startEmailSync();
        res.json({ message: 'Email synchronization started.' })
    } catch (error) {
        res.status(500).json({ error: 'Error starting email sync', details: error.message })
    }
}