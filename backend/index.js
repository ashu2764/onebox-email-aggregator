import express from 'express';
import dotenv from 'dotenv';
import aiReplyRoutes from './routes/aiReplyRoutes.js'
import emailRoutes from './routes/emailRoutes.js'
import aiCategorizationRoutes from './routes/aiCategorizationRoutes.js';

dotenv.config();
const app= express();

app.use(express.json());
app.use('/api/ai', aiReplyRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/ai', aiCategorizationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`🚀Server is Running On Port ${PORT}`)
})