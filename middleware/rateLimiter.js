import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        status: "error",
        message:
            "Too many requests from this IP, please try again after 15 minutes",
    },
    standardHeaders: true,
    legacyHeaders: false,

    // Optional configurations
    skipFailedRequests: false,
    skipSuccessfulRequests: false,

    // Custom handler for when limit is exceeded
    handler: (req, res) => {
        res.status(429).json({
            status: "error",
            message: "Rate limit exceeded",
        });
    },
});

export default limiter;
