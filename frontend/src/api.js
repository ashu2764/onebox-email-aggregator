import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const fetchEmails = async () => {
    return axios.get(`${API_BASE_URL}/email/emails`);
};

export const syncEmails = async () => {
    return axios.get(`${API_BASE_URL}/email/sync`);
};

export const suggestReply = async (emailText) => {
    return axios.post(`${API_BASE_URL}/ai/suggest`, { emailText });
};

export const addKnowledge = async (knowledge) => {
    return axios.post(`${API_BASE_URL}/ai/add-knowledge`, { knowledge });
};
