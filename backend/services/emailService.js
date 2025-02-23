import imaps from "imap-simple";
import { simpleParser } from "mailparser";
import esClient from "../config/elasticsearchClient.js";
import { categorizeAndStoreEmail } from './aiCategorization.js';
import dotenv from "dotenv";

dotenv.config();

const imapAccounts = [
    {
        user: process.env.IMAP_USER_1,
        password: process.env.IMAP_PASSWORD_1,
        host: process.env.IMAP_HOST_1,
    },
    // Add more accounts as needed
];

const connectToImap = async (config) => {
    const connection = await imaps.connect({
        imap: {
            user: config.user,
            password: config.password,
            host: config.host,
            port: 993,
            tls: true,
            tlsOptions: { rejectUnauthorized: false },
            authTimeout: 30000,
            keepalive: { interval: 10000, idleInterval: 300000, forceNoop: true }
        },
        onmail: async (numNewMsgs) => {
            console.log(`${numNewMsgs} new email(s) received.`);
            await fetchAndStoreEmails(connection);
        }
    });
    await connection.openBox('INBOX');
    console.log(`IMAP connected for ${config.user}`);
    return connection;
};

const fetchAndStoreEmails = async (connection) => {
    try {
        const sinceDate = new Date();
        sinceDate.setUTCDate(sinceDate.getUTCDate() - 30);
        sinceDate.setUTCHours(0, 0, 0, 0);

        const searchCriteria = [['SINCE', sinceDate.toISOString().split('T')[0]]];
        const fetchOptions = { bodies: ['HEADER', 'TEXT'], struct: true };

        const messages = await connection.search(searchCriteria, fetchOptions);

        for (const item of messages) {
            const email = await simpleParser(item.parts.find(part => part.which === 'TEXT').body);

            const emailData = {
                messageId: email.messageId || null,
                from: email.from?.text || "Unknown",
                to: email.to?.text || "Unknown",
                subject: email.subject || "No Subject",
                text: email.text || "",
                date: email.date ? new Date(email.date).toISOString() : null
            };

            // Ensure essential fields are not missing
            if (!emailData.messageId || !emailData.text.trim()) {
                console.error("Skipping email: Missing required fields", emailData);
                return;  // Skip this email and prevent error
            }

            await esClient.index({
                index: 'emails',
                id: emailData.messageId,
                body: emailData
            });

            console.log(`Stored email: ${emailData.messageId}`);
            await categorizeAndStoreEmail(emailData);
        }
    } catch (error) {
        console.error('Error fetching emails:', error);
    }
};

export const startEmailSync = async () => {
    for (const account of imapAccounts) {
        await connectToImap(account);
    }
};