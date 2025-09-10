import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, MONGO_URL } from "./config.js";
import {Book} from './models/bookModel.js';
import routesBooks from './routes/routesBooks.js'

const app = express();

app.use(express.json());

// CORS Policy
// app.use(cors());
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

app.get("/", (req, res) => {
    console.log(req);
    return res.status(234).send("MERN");
});

app.use('/books', routesBooks);

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });
