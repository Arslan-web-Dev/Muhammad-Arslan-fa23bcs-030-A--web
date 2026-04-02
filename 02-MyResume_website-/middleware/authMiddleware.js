const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Get token from cookie, x-auth-token header, or Authorization Bearer header
    let token = req.cookies.token || req.header('x-auth-token');
    if (!token) {
        const authHeader = req.header('authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.slice(7).trim();
        }
    }

    if (!token) {
        return res.status(401).json({ msg: 'Authorization denied. Please login.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error('Auth middleware error:', err.message);
        res.status(401).json({ msg: 'Token is not valid or has expired' });
    }
};
