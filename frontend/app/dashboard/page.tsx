"use client";

import { useState, useEffect } from "react";
import { Typography, Card, CardContent, CircularProgress, Alert, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import API_URL from "../utils/api";

export default function DashboardPage() {
    const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                window.location.href = "/login";
                return;
            }

            try {
                const res = await fetch(`${API_URL}/users/profile`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || "Failed to load user profile");
                }

                setUser(data);
            } catch (err: any) {
                setError(err.message || "Something went wrong");
                localStorage.removeItem("token");
                setTimeout(() => (window.location.href = "/login"), 2000);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

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
                                    <Typography className="mt-6 text-black">
                                        Your clients will show up here soon.
                                    </Typography>

                                    {/* 🚪 Logout Button */}
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
        </div>
    );
}
