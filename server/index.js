import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();
dotenv.config();

app.use(express.json());


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("DB Connected Successfully");
    }).catch((error) => {
        console.log("DB Connection Failed :", error);
    })

mongoose.connection.on("disconnected", () => {
    console.log("DB Disconnected");
})



app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})