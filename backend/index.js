import express from 'express';
import dotenv from 'dotenv';
import aiReplyRoutes from './routes/aiReplyRoutes.js'

dotenv.config();
const app= express();

app.use(express.json());
app.use('/ai-reply', aiReplyRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`🚀Server is Running On Port ${PORT}`)
})