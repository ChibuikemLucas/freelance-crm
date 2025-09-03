const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const clientRoutes = require("./routes/clientRoutes");
app.use("/api/clients", clientRoutes);

// Base route
app.get("/", (req, res) => {
    res.send("Welcome to Freelance Client CRM API 🚀");
});

// Error Handler (must be last middleware)
app.use(errorHandler);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
