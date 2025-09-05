const Client = require("../backend/models/Client");

// @desc   Get all clients
// @route  GET /api/clients
exports.getClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// @desc   Add a new client
// @route  POST /api/clients
exports.addClient = async (req, res) => {
    try {
        const { name, status, notes } = req.body;
        const client = await Client.create({ name, status, notes });
        res.status(201).json(client);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// @desc   Update a client
// @route  PUT /api/clients/:id
exports.updateClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!client) return res.status(404).json({ error: "Client not found" });
        res.json(client);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// @desc   Delete a client
// @route  DELETE /api/clients/:id
exports.deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) return res.status(404).json({ error: "Client not found" });
        res.json({ message: "Client deleted", client });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
