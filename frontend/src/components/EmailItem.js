import React from 'react';
import { ListItem, ListItemText } from '@mui/material';

const EmailItem = ({ email, onClick }) => {
    return (
        <ListItem button onClick={() => onClick(email)}>
            <ListItemText
                primary={email.subject || 'No Subject'}
                secondary={`From: ${email.from || 'Unknown'} - ${email.date ? new Date(email.date).toLocaleString() : 'No Date'}`}
            />
        </ListItem>
    );
};

export default EmailItem;
