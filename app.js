import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import exphbs from "express-handlebars";

dotenv.config();
const app = express();

// Database  connection
connectDB();

// Handlebars setup
app.engine(
    "hbs",
    exphbs.engine({
        extname: ".hbs",
        defaultLayout: "main.hbs",
    })
);
app.set("view engine", "hbs");

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Server setup
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
