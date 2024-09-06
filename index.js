import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import router from './Routes/index.js'



const app = express()
app.use(cors())
app.use(morgan('dev')) 
app.use(express.json())
dotenv.config()

app.use('/api/v1',router)
const PORT = process.env.PORT || 8000

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected');
        
        app.listen(PORT, () => {
            console.log(`Backend is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Something went wrong:', error);
    }
};
  
  startServer();