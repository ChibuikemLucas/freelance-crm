const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ✅ Ensure we always have a consistent user object
        req.user = {
            id: decoded.id || decoded._id,   // ID stored in token when signing
            email: decoded.email,
            name: decoded.name || decoded.username,
        };

        next();
    } catch (err) {
        res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
}

module.exports = authMiddleware;
