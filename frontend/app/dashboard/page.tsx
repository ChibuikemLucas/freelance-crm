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

export default function DashboardPage() {
    const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
    const [clients, setClients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [newClient, setNewClient] = useState("");

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    // Fetch user + clients
    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                window.location.href = "/login";
                return;
            }

            try {
                // 1) Fetch user
                const userRes = await fetch(`${API_URL}/users/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const userData = await userRes.json();
                if (!userRes.ok) throw new Error(userData.message);
                setUser(userData);

                // 2) Fetch clients
                const clientRes = await fetch(`${API_URL}/clients`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const clientData = await clientRes.json();
                if (!clientRes.ok) throw new Error(clientData.message);
                setClients(clientData);
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

    // 🔹 CRUD actions
    const createClient = async () => {
        if (!newClient.trim()) return;
        try {
            const res = await fetch(`${API_URL}/clients`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name: newClient }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            setClients([...clients, data]);
            setNewClient("");
            setSuccess("Client created successfully!");
        } catch (err: any) {
            setError(err.message);
        }
    };

    const updateClient = async (id: string, name: string) => {
        try {
            const res = await fetch(`${API_URL}/clients/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            setClients(clients.map((c) => (c._id === id ? data : c)));
            setSuccess("Client updated successfully!");
        } catch (err: any) {
            setError(err.message);
        }
    };

    const deleteClient = async (id: string) => {
        try {
            const res = await fetch(`${API_URL}/clients/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to delete client");

            setClients(clients.filter((c) => c._id !== id));
            setSuccess("Client deleted successfully!");
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    // Auto-dismiss success toast
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
                className="w-full max-w-2xl"
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

                            {!error && user && (
                                <>
                                    <Typography className="mt-4 text-black">
                                        Welcome back, <strong>{user.name}</strong> 👋
                                    </Typography>
                                    <Typography className="mt-2 text-black/70">
                                        Email: {user.email}
                                    </Typography>

                                    {/* Clients Section */}
                                    <div className="mt-8 space-y-4 text-left">
                                        <Typography variant="h6" className="text-black">
                                            Your Clients
                                        </Typography>

                                        <div className="flex gap-2">
                                            <TextField
                                                size="small"
                                                value={newClient}
                                                onChange={(e) => setNewClient(e.target.value)}
                                                placeholder="New client name"
                                                sx={{
                                                    "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                                                    input: { color: "#f8fafc" },
                                                }}
                                            />
                                            <Button
                                                variant="contained"
                                                onClick={createClient}
                                                sx={{ borderRadius: "9999px" }}
                                            >
                                                Add
                                            </Button>
                                        </div>

                                        <ul className="space-y-2">
                                            {clients.map((client) => (
                                                <li
                                                    key={client._id}
                                                    className="flex items-center justify-between bg-white/20 rounded-lg px-4 py-2"
                                                >
                                                    <span className="text-black">{client.name}</span>
                                                    <div className="space-x-2">
                                                        <Button
                                                            size="small"
                                                            variant="outlined"
                                                            onClick={() =>
                                                                updateClient(client._id, prompt("Edit name:", client.name) || client.name)
                                                            }
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
                                                </li>
                                            ))}
                                        </ul>
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
                                </>
                            )}
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
