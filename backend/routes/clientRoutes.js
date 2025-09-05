const express = require("express");
const Client = require("../backend/models/Client");
const authMiddleware = require("../backend/middleware/authMiddleware");

const router = express.Router();

// ✅ Protect all routes with authMiddleware
router.use(authMiddleware);

// @route   GET /api/clients
// @desc    Get all clients for logged-in user
router.get("/", async (req, res, next) => {
    try {
        const clients = await Client.find({ user: req.user.id }); // 🔒 only this user's clients
        res.json({ success: true, data: clients });
    } catch (err) {
        next(err);
    }
});

// @route   POST /api/clients
// @desc    Add new client
router.post("/", async (req, res, next) => {
    try {
        const { name, status, notes } = req.body;

        const client = new Client({
            name,
            status,
            notes,
            user: req.user.id, // 🔒 assign owner
        });

        await client.save();
        res.status(201).json({ success: true, data: client });
    } catch (err) {
        next(err);
    }
});

// @route   PUT /api/clients/:id
// @desc    Update client (only if owned by user)
router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        let client = await Client.findOne({ _id: id, user: req.user.id });
        if (!client) {
            return res.status(404).json({ success: false, message: "Client not found" });
        }

        client = await Client.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        res.json({ success: true, data: client });
    } catch (err) {
        next(err);
    }
});

// @route   DELETE /api/clients/:id
// @desc    Delete client (only if owned by user)
router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedClient = await Client.findOneAndDelete({ _id: id, user: req.user.id });
        if (!deletedClient) {
            return res.status(404).json({ success: false, message: "Client not found" });
        }

        res.json({ success: true, message: "Client removed" });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
