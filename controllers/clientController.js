// Temporary mock data (replace with MongoDB soon)
let clients = [
    { id: 1, name: "Acme Corp", status: "Proposal Sent", notes: "Follow up next week" },
    { id: 2, name: "Globex", status: "Interview Scheduled", notes: "Prepare presentation" },
    { id: 3, name: "Initech", status: "Rejected", notes: "Keep networking" },
];

// @desc   Get all clients
// @route  GET /api/clients
exports.getClients = (req, res) => {
    res.json(clients);
};

// @desc   Add a new client
// @route  POST /api/clients
exports.addClient = (req, res) => {
    const { name, status, notes } = req.body;

    if (!name || !status) {
        return res.status(400).json({ error: "Name and status are required" });
    }

    const newClient = {
        id: clients.length + 1,
        name,
        status,
        notes: notes || "",
    };

    clients.push(newClient);
    res.status(201).json(newClient);
};

// @desc   Update a client
// @route  PUT /api/clients/:id
exports.updateClient = (req, res) => {
    const { id } = req.params;
    const { name, status, notes } = req.body;

    const client = clients.find((c) => c.id === parseInt(id));

    if (!client) {
        return res.status(404).json({ error: "Client not found" });
    }

    if (name) client.name = name;
    if (status) client.status = status;
    if (notes) client.notes = notes;

    res.json(client);
};

// @desc   Delete a client
// @route  DELETE /api/clients/:id
exports.deleteClient = (req, res) => {
    const { id } = req.params;
    const index = clients.findIndex((c) => c.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ error: "Client not found" });
    }

    const deleted = clients.splice(index, 1);
    res.json({ message: "Client deleted", client: deleted[0] });
};
