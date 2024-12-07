import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    allowedHeaders: [
        "Content-type",
        "Authorization",
    ]
}));
app.use(cookieParser());

export { app };  // Export the app for use in server.js
