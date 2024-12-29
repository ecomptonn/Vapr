import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Load config
dotenv.config();

// Database  connection
connectDB();

// Server Setup
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
