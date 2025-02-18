// ensure steam user
const ensureAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/");
    }
};

// ensure user is a demo user
const ensureDemo = (req, res, next) => {
    if (req.session.user?._isDemoUser) {
        return next();
    } else {
        res.redirect("/");
    }
};

export { ensureAuth, ensureDemo };
