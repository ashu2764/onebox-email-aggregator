import React, { useState, useEffect } from 'react';
import { Paper, Typography, CircularProgress, Button } from '@mui/material';
import { suggestReply } from '../services/aiService';

const SuggestedReply = ({ emailText }) => {
    const [reply, setReply] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (emailText) {
            fetchSuggestedReply(emailText);
        }
    }, [emailText]);

    const fetchSuggestedReply = async (text) => {
        setLoading(true);
        setError('');
        try {
            const suggestedReply = await suggestReply(text);
            setReply(suggestedReply);
        } catch (error) {
            console.error('Error fetching suggested reply:', error);
            setError('Failed to fetch suggested reply. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper elevation={3} style={{ marginTop: '20px', padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
                Suggested Reply
            </Typography>
            {loading ? (
                <CircularProgress size={24} />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
                    {reply}
                </Typography>
            )}
        </Paper>
    );
};

export default SuggestedReply;