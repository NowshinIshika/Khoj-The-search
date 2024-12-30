const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify if User is Authenticated
const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) return res.status(401).json({ error: "No token, authorization denied." });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        if (!req.user) return res.status(404).json({ error: "User not found." });

        next();
    } catch (error) {
        res.status(401).json({ error: "Token is invalid" });
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
