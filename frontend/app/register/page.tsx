"use client";

import { useState, useEffect } from "react";
import { TextField, Button, Typography, Alert } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!name || !email || !password) {
            setError("Please fill out all fields.");
            return;
        }

        if (email === "used@example.com") {
            setError("This email is already registered.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        setSuccess("Account created successfully! Redirecting...");
    };

    // Auto-dismiss success toast after 3s
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    return (
        <div className="relative flex h-screen items-center justify-center bg-gradient-to-br from-cyan-700 via-sky-600 to-indigo-800 px-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-md rounded-3xl p-[2px] bg-gradient-to-r from-teal-400 via-sky-400 to-indigo-400 shadow-2xl"
            >
                <div className="rounded-3xl bg-white/10 backdrop-blur-lg border border-white/10 p-8">
                    <Typography
                        variant="h5"
                        className="mb-6 text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-indigo-200"
                    >
                        Create Your Account
                    </Typography>

                    {/* Inline error alert */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {error}
                                </Alert>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <TextField
                            label="Name"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{
                                "& label": { color: "#cbd5e1" },
                                "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                                input: { color: "#f8fafc" },
                            }}
                        />
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{
                                "& label": { color: "#cbd5e1" },
                                "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                                input: { color: "#f8fafc" },
                            }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{
                                "& label": { color: "#cbd5e1" },
                                "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                                input: { color: "#f8fafc" },
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                borderRadius: "9999px",
                                py: 1.4,
                                fontWeight: 700,
                                textTransform: "none",
                                background: "linear-gradient(90deg,#0284C7 0%,#2563EB 100%)",
                                "&:hover": {
                                    background: "linear-gradient(90deg,#0369A1 0%,#1E40AF 100%)",
                                },
                            }}
                        >
                            Register
                        </Button>
                    </form>
                </div>
            </motion.div>

            {/* Success toast notification */}
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
