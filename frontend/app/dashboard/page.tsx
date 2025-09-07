"use client";

import { useState, useEffect } from "react";
import {
    Typography,
    Card,
    CardContent,
    CircularProgress,
    Alert,
    Button,
    TextField,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import API_URL from "../utils/api";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
    name?: string;
    username?: string;
    email?: string;
    exp?: number;
};

export default function DashboardPage() {
    const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
    const [clients, setClients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // 🔹 Add Client Form
    const [clientForm, setClientForm] = useState({
        name: "",
        email: "",
        phone: "",
        status: "Proposal Sent", // ✅ valid default
    });

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    // ✅ Decode JWT for user info
    useEffect(() => {
        if (token) {
            try {
                const decoded: DecodedToken = jwtDecode(token);
                setUser({
                    name: decoded.name || decoded.username || "User",
                    email: decoded.email || "",
                });
            } catch (err) {
                console.error("Invalid token", err);
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
        }
    }, [token]);

    // ✅ Fetch clients
    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                window.location.href = "/login";
                return;
            }

            try {
                const clientRes = await fetch(`${API_URL}/clients`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const clientData = await clientRes.json();
                if (!clientRes.ok) throw new Error(clientData.message);

                setClients(Array.isArray(clientData) ? clientData : clientData.clients || []);
            } catch (err: any) {
                setError(err.message || "Something went wrong");
                localStorage.removeItem("token");
                setTimeout(() => (window.location.href = "/login"), 2000);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // ✅ Handle input changes for create form
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setClientForm((prev) => ({ ...prev, [name]: value }));
    };

    // ✅ Create client
    const createClient = async () => {
        try {
            const payload = { ...clientForm };

            const res = await fetch(`${API_URL}/clients`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            setClients((prev) => [...prev, data]);
            setClientForm({ name: "", email: "", phone: "", status: "Proposal Sent" });
            setSuccess("Client created successfully!");
        } catch (err: any) {
            setError(err.message);
        }
    };

    // ✅ Update client (all fields, exact enum values)
    const updateClient = async (id: string, client: any) => {
        const updated = {
            name: prompt("Edit name:", client.name) || client.name,
            email: prompt("Edit email:", client.email) || client.email,
            phone: prompt("Edit phone:", client.phone) || client.phone,
            status:
                prompt(
                    "Edit status (Proposal Sent / Interview Scheduled / Rejected / Won):",
                    client.status
                ) || client.status,
        };

        try {
            const res = await fetch(`${API_URL}/clients/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updated),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            setClients((prev) => prev.map((c) => (c._id === id ? data : c)));
            setSuccess("Client updated successfully!");
        } catch (err: any) {
            setError(err.message);
        }
    };

    // ✅ Delete client
    const deleteClient = async (id: string) => {
        try {
            const res = await fetch(`${API_URL}/clients/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to delete client");

            setClients((prev) => prev.filter((c) => c._id !== id));
            setSuccess("Client deleted successfully!");
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    // ✅ Auto-dismiss success toast
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-700 via-sky-600 to-indigo-800 p-6 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-5xl"
            >
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <CircularProgress sx={{ color: "#38bdf8" }} />
                    </div>
                ) : (
                    <Card className="rounded-3xl shadow-2xl bg-white/10 backdrop-blur-lg border border-white/10">
                        <CardContent className="p-8 text-center">
                            <Typography
                                variant="h4"
                                className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400"
                            >
                                Dashboard
                            </Typography>

                            {/* ✅ User welcome */}
                            {user && (
                                <div className="mt-4 text-black">
                                    <Typography>
                                        Welcome back, <strong>{user.name}</strong> 👋
                                    </Typography>
                                    <Typography className="text-black/70">
                                        Email: {user.email}
                                    </Typography>
                                </div>
                            )}

                            {/* Error alert */}
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        key="error"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        className="mt-4"
                                    >
                                        <Alert severity="error">{error}</Alert>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* 🔹 Add Client Form */}
                            <div className="mt-8 space-y-4 text-left">
                                <Typography variant="h6" className="text-black text-center">
                                    Add New Client
                                </Typography>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <TextField
                                        size="small"
                                        label="Name"
                                        name="name"
                                        value={clientForm.name}
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        size="small"
                                        label="Email"
                                        name="email"
                                        value={clientForm.email}
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        size="small"
                                        label="Phone"
                                        name="phone"
                                        value={clientForm.phone}
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        select
                                        size="small"
                                        label="Status"
                                        name="status"
                                        value={clientForm.status}
                                        onChange={handleInputChange}
                                        SelectProps={{ native: true }}
                                    >
                                        <option value="Proposal Sent">Proposal Sent</option>
                                        <option value="Interview Scheduled">Interview Scheduled</option>
                                        <option value="Rejected">Rejected</option>
                                        <option value="Won">Won</option>
                                    </TextField>
                                </div>

                                <Button
                                    variant="contained"
                                    onClick={createClient}
                                    sx={{ borderRadius: "9999px", marginTop: "12px" }}
                                >
                                    Add Client
                                </Button>
                            </div>

                            {/* 🔹 Clients Grid */}
                            <div className="mt-10 text-left">
                                <Typography variant="h6" className="text-black text-center mb-4">
                                    Your Clients
                                </Typography>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {clients.map((client, index) => (
                                        <Card
                                            key={client._id || index} // ✅ fix key warning
                                            className="rounded-xl shadow-md bg-white/80 p-4"
                                        >
                                            <CardContent>
                                                <div className="text-black">
                                                    <strong>{client.name}</strong> <br />
                                                    <span className="text-sm text-black/70">
                                                        {client.email} <br />
                                                        {client.phone} <br />
                                                        {client.status}
                                                    </span>
                                                </div>
                                                <div className="mt-3 space-x-2">
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        onClick={() => updateClient(client._id, client)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        color="error"
                                                        onClick={() => deleteClient(client._id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            {/* 🚪 Logout */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mt-8"
                            >
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={handleLogout}
                                    className="rounded-xl shadow-md px-6 py-2"
                                >
                                    Logout
                                </Button>
                            </motion.div>
                        </CardContent>
                    </Card>
                )}
            </motion.div>

            {/* ✅ Success Toast */}
            <div className="fixed bottom-6 right-6">
                <AnimatePresence>
                    {success && (
                        <motion.div
                            key="toast"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Alert
                                severity="success"
                                sx={{
                                    boxShadow: 4,
                                    borderRadius: "12px",
                                    bgcolor: "#ecfdf5",
                                    color: "#047857",
                                }}
                            >
                                {success}
                            </Alert>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
