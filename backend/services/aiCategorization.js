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
Response format (valid JSON only): {"category": "LABEL_NAME"}`;

    const response = await model.generateContent(prompt);

    console.log("AI Raw Response:", response.response);

    // Extract the category text from response
    let categoryText;
    try {
        categoryText = response.response.candidates[0].content.parts[0].text;
        console.log("Extracted AI Response Text:", categoryText);
    } catch (error) {
        console.error("Failed to extract AI response:", error);
        throw new Error("Invalid AI response structure");
    }

    let category;
    try {
        category = JSON.parse(categoryText);
    } catch (error) {
        console.error("Failed to parse AI response:", error);
        throw new Error("Invalid AI response format");
    }

    if (!category || !category.category) {
        throw new Error("AI did not return a valid category");
    }

    return category.category;
};


export const categorizeAndStoreEmail = async (email) => {
    try {
        if (!email || !email.text || !email.messageId) {
            console.error('Invalid email data:', email);
            throw new Error('Invalid email data received');
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
