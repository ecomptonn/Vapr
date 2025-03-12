import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import exphbs from "express-handlebars";
import session from "express-session";
import passport from "passport";
import configurePassport from "./config/passport.js";
import MongoStore from "connect-mongo";
import {
    calendarTime,
    formatDate,
    sortFriendStatus,
    formatLastPlayed,
    eq,
    gt,
    lt,
    gte,
    lte,
    or,
    recentGames,
} from "./helpers/hbs.js";

// Import routes
import indexRoute from "./routes/index.js";
import authRoute from "./routes/auth.js";

// Load config
dotenv.config();

// Passport config
configurePassport(passport);

const app = express();

// Database  connection
connectDB();

// Handlebars setup
app.engine(
    "hbs",
    exphbs.engine({
        helpers: {
            formatDate,
            formatLastPlayed,
            calendarTime,
            sortFriendStatus,
            recentGames,
            eq,
            gt,
            lt,
            gte,
            lte,
            or,
        },
        extname: ".hbs",
        defaultLayout: "main",
    })
);
app.set("view engine", "hbs");

// Sessions
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", indexRoute);
app.use("/auth", authRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(
        `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
});
