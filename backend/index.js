import express from 'express';
import dotenv from 'dotenv';
import aiReplyRoutes from './routes/aiReplyRoutes.js'
import emailRoutes from './routes/emailRoutes.js'
import aiCategorizationRoutes from './routes/aiCategorizationRoutes.js';
import cors from 'cors'
dotenv.config();
const app= express();

app.use(cors({
    origin: "http://localhost:3000", // Allow frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use('/api/ai', aiReplyRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/ai', aiCategorizationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`🚀Server is Running On Port ${PORT}`)
})