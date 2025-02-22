import imaps from "imap-simple";
import { simpleParser } from "mailparser";
import esClient from "../config/elasticsearchClient.js";

import dotenv from "dotenv";

dotenv.config();

const imapAccounts = [
    {
        user: process.env.IMAP_USER_1,
        password: process.env.IMAP_PASSWORD_1,
        host: process.env.IMAP_HOST_1,
    },
    {
        user: process.env.IMAP_USER_2,
        password: process.env.IMAP_PASSWORD_2,
        host: process.env.IMAP_HOST_2,
    },
];

const connectToImap = async (config) => {
    const connection = await imaps.connect({
        imap: {
            user: config.user,
            password: config.password,
            host: config.host,
            port: 993,
            tls: true,
            tlsOptions: { rejectUnauthorized: false }
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
        sinceDate.setDate(sinceDate.getDate() - 30);

        const searchCriteria = [['SINCE', sinceDate.toISOString().split('T')[0]]];
        const fetchOptions = { bodies: ['HEADER', 'TEXT'], struct: true };

        const messages = await connection.search(searchCriteria, fetchOptions);

        for (const item of messages) {
            const email = await simpleParser(item.parts.find(part => part.which === 'TEXT').body);
            const emailData = {
                messageId: email.messageId,
                from: email.from.text,
                to: email.to.text,
                subject: email.subject,
                text: email.text,
                date: email.date
            };

            await esClient.index({
                index: 'emails',
                id: emailData.messageId,
                body: emailData
            });

            console.log(`Stored email: ${emailData.subject}`);
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