import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDb } from "./database/index.js";
import { DB_NAME } from "./constant.js";
import { app } from "./app.js";
import Bookroutes from "./routes/Bookroutes.js";

dotenv.config();

const PORT = process.env.PORT || 7000;

app.use("/api/v1/books", Bookroutes);

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server Running on PORT ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed", err);
    });
