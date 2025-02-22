import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const triggerWebhook = async (email) => {
    try {
        if (!email) {
            throw new Error('Email data is required');
        }

        const payload = {
            event: 'new_interested_email',
            email
        };

        await axios.post(process.env.WEBHOOK_URL, payload);

        console.log('Webhook triggered.');
    } catch (error) {
        console.error('Error triggering webhook:', error);
    }
};