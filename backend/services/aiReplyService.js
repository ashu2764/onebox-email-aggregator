import genAI from "../config/geminiClient.js";
import pool from "../config/db.js"; // Import the PostgreSQL pool

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const generateSuggestedReply = async (emailText) => {
    if (!emailText || typeof emailText !== "string") {
        throw new Error("Email text is required and must be a valid string.");
    }

    try {
        const prompt = `Generate a suggested reply for the following email:
Email: "${emailText}";`;

        const response = await model.generateContent(prompt);

        if (
            !response.response ||
            !response.response.candidates ||
            response.response.candidates.length === 0
        ) {
            throw new Error("No valid response generated from the AI model.");
        }

        return response.response.candidates[0].content;
    } catch (error) {
        console.error("Error generating suggested reply:", error);
        throw new Error(
            "Failed to generate suggested reply. Please try again."
        );
    }
};

export const storeKnowledge = async (text) => {
    if (!text || typeof text !== "string") {
        throw new Error("Text is required and must be a valid string.");
    }

    try {
        // Insert the knowledge text into the database
        const query = `
      INSERT INTO knowledge_base (text, created_at)
      VALUES ($1, NOW())
      RETURNING *;
    `;

        const values = [text];

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            throw new Error("Failed to store knowledge in the database.");
        }

        console.log(`Stored knowledge with ID: ${result.rows[0].id}`);
        return result.rows[0]; // Return the stored knowledge record
    } catch (error) {
        console.error("Error storing knowledge:", error);
        throw new Error("Failed to store knowledge. Please try again.");
    }
};
