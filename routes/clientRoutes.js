const express = require("express");
const Client = require("../models/Client");
const router = express.Router();

// GET all clients
router.get("/", async (req, res, next) => {
    try {
        const clients = await Client.find();
        res.json({ success: true, data: clients });
    } catch (err) {
        next(err); // Pass to error handler
    }
});

// POST new client
router.post("/", async (req, res, next) => {
    try {
        const { name, status, notes } = req.body;

        if (!name || !status) {
            const error = new Error("Name and status are required");
            error.statusCode = 400;
            throw error;
        }

        const newClient = new Client({ name, status, notes });
        await newClient.save();

        res.status(201).json({ success: true, data: newClient });
    } catch (err) {
        next(err);
    }
});

// PUT update client
router.put("/:id", async (req, res, next) => {
    try {
        const { name, status, notes } = req.body;

        const updatedClient = await Client.findByIdAndUpdate(
            req.params.id,
            { name, status, notes },
            { new: true, runValidators: true }
        );

        if (!updatedClient) {
            const error = new Error("Client not found");
            error.statusCode = 404;
            throw error;
        }

        res.json({ success: true, data: updatedClient });
    } catch (err) {
        next(err);
    }
});

// DELETE remove client
router.delete("/:id", async (req, res, next) => {
    try {
        const deletedClient = await Client.findByIdAndDelete(req.params.id);

        if (!deletedClient) {
            const error = new Error("Client not found");
            error.statusCode = 404;
            throw error;
        }

        res.json({ success: true, message: "Client deleted successfully" });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
