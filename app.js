import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import exphbs from "express-handlebars";
import demoUser from "./data/demoUser.js";

// Import routes
import indexRoute from "./routes/index.js";

dotenv.config();
const app = express();

// Database  connection
connectDB();

// Handlebars setup
app.engine(
    "hbs",
    exphbs.engine({
        extname: ".hbs",
        defaultLayout: "main",
    })
);
app.set("view engine", "hbs");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.use("/", indexRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(
        `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
});
