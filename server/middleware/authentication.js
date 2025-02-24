const jwt = require('jsonwebtoken');
const User = require('../Modals/user');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const SECRET_KEY = process.env.JWT_SECRET || "Its_My_Secret_Key";
        console.log(token)
        if (!token) {
            return res.status(401).json({ error: 'No token, authorization denied' });
        }

        console.log("Token received:", token);

        // Verify JWT
        const decoded = jwt.verify(token, SECRET_KEY);

        // Fetch user and attach to request object
        req.user = await User.findById(decoded.userId).select('-password');
        
        if (!req.user) {
            return res.status(404).json({ error: 'User not found' });
        }

        next();
    } catch (err) {
        console.error("JWT verification error:", err);
        return res.status(401).json({ error: 'Invalid token, authorization denied' });
    }
};

module.exports = auth;
