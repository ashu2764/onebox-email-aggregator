import axios from 'axios';
import dotenv from 'dotenv'

dotenv.config()

 const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

export const sendSlackNotification = async (email) => {
    try {
        const message = {
            text: `📩 *New Interested Email*\n\n*Subject:* ${email.subject || 'No Subject'}\n*Message:* ${email.text.substring(0, 100)}...`
        };
        await axios.post(SLACK_WEBHOOK_URL, message);
        console.log('Slack notification sent.');
    } catch (error) {
        console.error('Failed to send Slack notification:', error.message);
    }
};
