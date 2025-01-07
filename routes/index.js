import express from "express";
const router = express.Router();

// @desc    Home Page
// @route   GET /
router.get("/", (req, res) => {
    res.render("pages/dashboard/home");
});

// @desc    Privacy Page
// @route   GET /privacy
router.get("/privacy", (req, res) => {
    res.render("pages/privacy", {
        layout: "policy",
    });
});

export default router;
