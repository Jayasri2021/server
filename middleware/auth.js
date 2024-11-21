const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Middleware to verify JWT tokens
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'Token required' });
    }
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded; // Attach the decoded payload to the request
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { verifyToken };
