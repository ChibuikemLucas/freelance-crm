// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // needed to parse JSON request bodies

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

// ✅ NEW: Add Client
app.post("/api/clients", (req, res) => {
    const { name, status, notes } = req.body;

    if (!name || !status) {
        return res.status(400).json({ error: "Name and status are required" });
    }

    const newClient = {
        id: clients.length + 1, // simple auto-increment
        name,
        status,
        notes: notes || "",
    };

    clients.push(newClient);
    res.status(201).json(newClient);
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
