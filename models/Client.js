// models/Client.js
const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Client name is required"],
        },
        status: {
            type: String,
            enum: ["Proposal Sent", "Interview Scheduled", "Rejected", "Won"],
            required: [true, "Status is required"],
        },
        notes: {
            type: String,
            default: "",
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // 🔑 links to User model
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Client", clientSchema);
