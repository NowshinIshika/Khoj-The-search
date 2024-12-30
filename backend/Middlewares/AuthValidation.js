const Joi = require('joi');

// Signup validation middleware
const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request", error });
    }
    next();
};

// Login validation middleware
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request", error });
    }
    next();
};

// Session-based authentication middleware
const isAuthenticated = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'Access denied. No session found.' });
    }
    next();
};

module.exports = {
    signupValidation,
    loginValidation,
    isAuthenticated
};