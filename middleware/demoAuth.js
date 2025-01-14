import demoUser from "../data/demoUser";

const createDemoSession = async (req, res, next) => {
    try {
        req.session.user = demoUser;
        req.session.isDemo = true;
        return next();
    } catch (error) {
        console.error("Demo session error", error);
        return res.status(500).json({ error: "Failed to create demo session" });
    }
};
