import express from "express";
import { ensureAuth } from "../middleware/auth.js";
import demoUser from "../data/demoUser.js";
const router = express.Router();

// @desc    Login Page
// @route   GET /
router.get("/", (req, res) => {
    res.render("pages/auth/login", {
        layout: "login",
    });
});

// @desc    Dashboard
// @route   GET /dashboard
router.get("/dashboard", ensureAuth, async (req, res) => {
    try {
        const user = req.user || req.session.user;

        res.render("pages/dashboard/home", { user });
    } catch (error) {
        console.error(error);
        res.render("error/500");
    }
});

// @desc    Demo Dashboard
// @route   GET /demo
router.get("/demo", (req, res) => {
    if (!req.session.user) {
        req.session.user = demoUser;
    }

    const user = req.session.user;
    res.render("pages/demo/home", { user });
});

// @desc    Demo Friends
// @route   GET /demo/friends
router.get("/demo/friends", (req, res) => {
    res.render("pages/demo/friends", { user: req.session.user });
});

// @desc    Friends
// @route   GET /friends
router.get("/friends", (req, res) => {
    res.render("pages/dashboard/friends");
});

// @desc    Privacy Page
// @route   GET /privacy
router.get("/privacy", (req, res) => {
    res.render("pages/privacy", {
        layout: "policy",
    });
});

export default router;
