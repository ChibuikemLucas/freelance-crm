const express = require("express");
const authMiddleware = require("../backend/middleware/authMiddleware");
const User = require("../backend/models/User");

const router = express.Router();

// Protect this route
router.get("/me", authMiddleware, async (req, res, next) => {
    try {
        res.json({ success: true, user: req.user });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
