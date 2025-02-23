import React, { useState } from 'react';
import { List, Paper, Typography, Button } from '@mui/material';
import EmailItem from './EmailItem';
import EmailDetails from './EmailDetails';

const EmailList = ({ emails }) => {
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [aiReply, setAiReply] = useState('');

    const handleSuggestReply = async (email) => {
        try {
            const response = await fetch('http://localhost:5000/api/ai/suggest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messageId: email.id }),
            });

            const data = await response.json();
            if (response.ok) {
                setAiReply(data.suggestedReply);
                setSelectedEmail({ ...email, aiReply: data.suggestedReply });  // Update email with AI reply
            } else {
                console.error('Error fetching AI reply:', data.error);
            }
        } catch (error) {
            console.error('Request failed:', error);
        }
    };

    return (
        <Paper elevation={3} style={{ marginTop: '20px', padding: '10px' }}>
            {selectedEmail ? (
                <>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            setSelectedEmail(null);
                            setAiReply('');
                        }}
                        style={{ marginBottom: '10px' }}
                    >
                        Back to Emails
                    </Button>
                    <EmailDetails
                        email={selectedEmail}
                        aiReply={aiReply}
                        onSuggestReply={handleSuggestReply}
                    />
                </>
            ) : (
                <>
                    {emails.length > 0 ? (
                        <List>
                            {emails.map((email) => (
                                <EmailItem
                                    key={email.id}
                                    email={email}
                                    onClick={(email) => {
                                        setSelectedEmail(email);
                                        setAiReply('');
                                    }}
                                />
                            ))}
                        </List>
                    ) : (
                        <Typography variant="body1" align="center" style={{ padding: '20px' }}>
                            No emails found.
                        </Typography>
                    )}
                </>
            )}
        </Paper>
    );
};

export default EmailList;
