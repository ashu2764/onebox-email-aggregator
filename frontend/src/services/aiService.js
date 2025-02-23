import axios from 'axios';

const API_URL = 'http://localhost:5000/api/ai';

export const suggestReply = async (emailText) => {
    try {
        const response = await axios.post(`${API_URL}/suggest`, { emailText });
        return response.data.suggestedReply;
    } catch (error) {
        console.error('Error suggesting reply:', error);
        throw error;
    }
};