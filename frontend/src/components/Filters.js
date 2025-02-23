import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

const Filters = ({ onSync }) => {
    return (
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <FormControl variant="outlined" style={{ flex: 1 }}>
                <InputLabel>Filter by</InputLabel>
                <Select label="Filter by" defaultValue="">
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Interested">Interested</MenuItem>
                    <MenuItem value="Not Interested">Not Interested</MenuItem>
                    <MenuItem value="Spam">Spam</MenuItem>
                    <MenuItem value="Out Of Office">Out Of Office</MenuItem>
                </Select>
            </FormControl>
            <Button variant="contained" color="primary" onClick={onSync}>
                Sync Emails
            </Button>
        </div>
    );
};

export default Filters;
