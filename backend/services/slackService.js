import { WebClient } from '@slack/web-api';
import dotenv from 'dotenv';

dotenv.config();

const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);
const slackChannel = process.env.SLACK_CHANNEL_ID;

export const sendSlackNotification = async (email) => {
    try {
        if (!email || !email.from || !email.subject || !email.text) {
            throw new Error('Invalid email data');
        }

        const message = `📧 *New Interested Email*\n\n*From:* ${email.from}\n*Subject:* ${email.subject}\n*Message:* ${email.text}`;

        await slackClient.chat.postMessage({
            channel: slackChannel,
            text: message
        });

        console.log('Slack notification sent.');
    } catch (error) {
        console.error('Error sending Slack notification:', error);
    }
};