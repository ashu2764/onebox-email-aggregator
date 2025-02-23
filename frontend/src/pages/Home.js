import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress } from '@mui/material';
import EmailList from '../components/EmailList';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import { getAllEmails, syncEmails } from '../services/emailService';

const Home = () => {
    const [emails, setEmails] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchEmails();
    }, [searchQuery]);

    const fetchEmails = async () => {
        setLoading(true);
        try {
            const data = await getAllEmails(searchQuery);
            setEmails(data);
        } catch (error) {
            console.error('Error fetching emails:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSync = async () => {
        setLoading(true);
        try {
            await syncEmails();
            fetchEmails(); // Refresh the email list after sync
        } catch (error) {
            console.error('Error syncing emails:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Email Inbox
            </Typography>
            <SearchBar onSearch={setSearchQuery} />
            <Filters onSync={handleSync} />
            {loading ? (
                <CircularProgress style={{ margin: '20px auto', display: 'block' }} />
            ) : (
                <EmailList emails={emails} />
            )}
        </Container>
    );
};

export default Home;
