import express from 'express';
import dotenv from 'dotenv';
import aiReplyRoutes from './routes/aiReplyRoutes.js'
import emailRoutes from './routes/emailRoutes.js'

dotenv.config();
const app= express();

app.use(express.json());
app.use('/ai-reply', aiReplyRoutes);
app.use('/emails', emailRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`🚀Server is Running On Port ${PORT}`)
})