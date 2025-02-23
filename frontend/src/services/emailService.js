import axios from 'axios';

const API_URL = 'http://localhost:5000/api/email';

export const getAllEmails = async (query = '') => {
    try {
        const response = await axios.get(`${API_URL}/emails`, {
            params: { query },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching emails:', error);
        throw error;
    }
};

export const syncEmails = async () => {
    try {
        const response = await axios.get(`${API_URL}/sync`);
        return response.data;
    } catch (error) {
        console.error('Error syncing emails:', error);
        throw error;
    }
};
