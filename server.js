// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const clients = [
    { id: 1, name: "Acme Corp", status: "Proposal Sent", notes: "Follow up next week" },
    { id: 2, name: "Globex", status: "Interview Scheduled", notes: "Prepare presentation" },
    { id: 3, name: "Initech", status: "Rejected", notes: "Keep networking" },
];

app.get("/", (req, res) => {
    res.send("Welcome to Freelance Client CRM API 🚀");
});

app.get("/api/clients", (req, res) => {
    res.json(clients);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
