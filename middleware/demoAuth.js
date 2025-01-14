import demoUser from "../data/demoUser.js";

const createDemoSession = async (req, res, next) => {
    try {
        req.session.user = demoUser;
        return next();
    } catch (error) {
        console.error("Demo session error", error);
        return res
            .status(500)
            .json({ error: "Failed to create demo sesssion" });
    }
};

export default createDemoSession;
