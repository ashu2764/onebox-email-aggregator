import genAI from "../config/geminiClient.js";

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const generateSuggestedReply = async (emailText) => {
    const prompt = `
  Generate a professional email reply based on this received message:
  "${emailText}"
  `;

    const response = await model.generateContent(prompt);
    return response.response.candidates[0].content;
};
