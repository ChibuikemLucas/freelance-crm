// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON request bodies

// Mock client data (temporary until MongoDB)
let clients = [
    { id: 1, name: "Acme Corp", status: "Proposal Sent", notes: "Follow up next week" },
    { id: 2, name: "Globex", status: "Interview Scheduled", notes: "Prepare presentation" },
    { id: 3, name: "Initech", status: "Rejected", notes: "Keep networking" },
];

// Routes
app.get("/", (req, res) => {
    res.send("Welcome to Freelance Client CRM API 🚀");
});

app.get("/api/clients", (req, res) => {
    res.json(clients);
});

//  CREATE
app.post("/api/clients", (req, res) => {
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
});

// UPDATE
app.put("/api/clients/:id", (req, res) => {
    const { id } = req.params;
    const { name, status, notes } = req.body;

    const client = clients.find((c) => c.id === parseInt(id));
    if (!client) return res.status(404).json({ error: "Client not found" });

    // update fields if provided
    if (name) client.name = name;
    if (status) client.status = status;
    if (notes) client.notes = notes;

    res.json(client);
});

// DELETE
app.delete("/api/clients/:id", (req, res) => {
    const { id } = req.params;
    const clientIndex = clients.findIndex((c) => c.id === parseInt(id));

    if (clientIndex === -1) {
        return res.status(404).json({ error: "Client not found" });
    }

    const deletedClient = clients.splice(clientIndex, 1);
    res.json({ message: "Client removed", client: deletedClient[0] });
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
