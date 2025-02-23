import React from 'react';
import { Paper, Typography, Button } from '@mui/material';

const EmailDetails = ({ email, aiReply, onSuggestReply }) => {
    // Extract text if aiReply is an object
    const extractReplyText = (reply) => {
        if (typeof reply === 'string') return reply;
        if (typeof reply === 'object' && reply.parts) {
            return reply.parts.map(part => part.text).join(' '); // Extract text from parts
        }
        return 'AI reply could not be processed.';
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', marginTop: '10px' }}>
            <Typography variant="h6">{email.subject}</Typography>
            <Typography variant="body1" color="textSecondary">{email.sender}</Typography>
            <Typography variant="body2" style={{ marginTop: '10px' }}>{email.text}</Typography>

            {/* Show "Suggest Reply with AI" button only when email is open */}
            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
                onClick={() => onSuggestReply(email)}
            >
                Suggest Reply with AI
            </Button>

            {/* Show AI-generated reply */}
            {aiReply && (
                <>
                    <Typography variant="h6" style={{ marginTop: '20px' }}>Suggested AI Reply:</Typography>
                    <Typography variant="body2" style={{ fontStyle: 'italic', background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
                        {extractReplyText(aiReply)}
                    </Typography>
                </>
            )}
        </Paper>
    );
};

export default EmailDetails;
