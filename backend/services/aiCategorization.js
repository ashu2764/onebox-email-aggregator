import genAI from '../config/geminiClient.js';
import esClient from '../config/elasticsearchClient.js';

const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

const CATEGORY_LABELS = [
    'Interested',
    'Meeting Booked',
    'Not Interested',
    'Spam',
    'Out of Office'
];

export const categorizeEmail = async (emailText) => {
    if (!emailText) {
        throw new Error('Email text is required');
    }

    const prompt = `Categorize the following email into one of these labels: ${CATEGORY_LABELS.join(', ')}.
Email: "${emailText}"
Response format: {"category": "LABEL_NAME"}`;

    const response = await model.generateContent(prompt);
    const category = JSON.parse(response.response.candidates[0].content);

    return category.category;
};

export const categorizeAndStoreEmail = async (email) => {
    try {
        if (!email || !email.text || !email.messageId) {
            throw new Error('Invalid email data');
        }

        const category = await categorizeEmail(email.text);

        await esClient.update({
            index: 'emails',
            id: email.messageId,
            body: {
                doc: { category }
            }
        });

        console.log(`Email categorized as: ${category}`);
        return category;
    } catch (error) {
        console.error('Categorization failed:', error);
        throw error;
    }
};