const User = require('../Models/user');

// Verify if User is Authenticated
const isAuthenticated = async (req, res, next) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ error: "No session, authorization denied." });
        }

        req.user = await User.findById(req.session.userId);
        if (!req.user) {
            return res.status(404).json({ error: "User not found." });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Check Admin Role
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ error: "Access denied. Admins only." });
    }
};

module.exports = { isAuthenticated, isAdmin };