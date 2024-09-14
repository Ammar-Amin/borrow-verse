import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

const __dirname = path.resolve();


const app = express();
dotenv.config();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());

// MONGO DB CONNECTION 
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("DB Connected Successfully");
    }).catch((error) => {
        console.log("DB Connection Failed :", error);
    })

mongoose.connection.on("disconnected", () => {
    console.log("DB Disconnected");
})

// ROUTES IMPORT
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import bookRoutes from './routes/book.route.js'
import transactionRoutes from './routes/transaction.route.js'

// ROUTES DECLARATION 
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/book', bookRoutes)
app.use('/api/transaction', transactionRoutes)


// STATIC FILES
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

// ERROR HANDLING
app.use((error, req, res, next) => {
    const success = false
    const status = error.status || 500;
    const message = error.message || "Something went wrong!";
    return res.status(status).json({
        success,
        status,
        message,
        stack: error.stack
    })
})

// SERVER LISTENING
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})