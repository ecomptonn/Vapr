import express from "express";
const router = express.Router();
import demoUser from "../data/demoUser";

// Start demo session
router.get("/demo-login", (req, res) => {
    req.session.demoUser = demoUser;
    res.redirect("/dashboard");
});

// Exit demo session
router.get("/exit", (req, res) => {
    req.session.demoUser = null;
    res.redirect("/");
});

export default router;
