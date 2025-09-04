const express = require("express");
const Client = require("../models/Client");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Protect all routes with authMiddleware
router.use(authMiddleware);

// @route   GET /api/clients
// @desc    Get all clients
router.get("/", async (req, res, next) => {
    try {
        const clients = await Client.find();
        res.json({ success: true, data: clients });
    } catch (err) {
        next(err);
    }
});

// @route   POST /api/clients
// @desc    Add new client
router.post("/", async (req, res, next) => {
    try {
        const { name, email, phone, project } = req.body;
        const client = new Client({ name, email, phone, project });
        await client.save();
        res.status(201).json({ success: true, data: client });
    } catch (err) {
        next(err);
    }
});

// @route   PUT /api/clients/:id
// @desc    Update client
router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedClient = await Client.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedClient) {
            return res.status(404).json({ success: false, message: "Client not found" });
        }

        res.json({ success: true, data: updatedClient });
    } catch (err) {
        next(err);
    }
});

// @route   DELETE /api/clients/:id
// @desc    Delete client
router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedClient = await Client.findByIdAndDelete(id);

        if (!deletedClient) {
            return res.status(404).json({ success: false, message: "Client not found" });
        }

        res.json({ success: true, message: "Client removed" });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
