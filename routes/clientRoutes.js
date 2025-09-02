const express = require("express");
const {
    getClients,
    addClient,
    updateClient,
    deleteClient,
} = require("../controllers/clientController");

const router = express.Router();

// GET all clients
router.get("/", getClients);

// POST add client
router.post("/", addClient);

// PUT update client
router.put("/:id", updateClient);

// DELETE remove client
router.delete("/:id", deleteClient);

module.exports = router;
