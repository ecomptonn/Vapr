import express from "express";
const router = express.Router();

// @desc    Home Page
// @route   GET /
router.get("/", (req, res) => {
    res.render("pages/home");
});

export default router;
