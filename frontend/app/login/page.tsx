"use client";

import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ email, password });
    };

    return (
        <div className="relative flex h-screen items-center justify-center bg-gradient-to-br from-cyan-700 via-sky-600 to-indigo-800 px-4">
            {/* Card container */}
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
                        Login to Freelance CRM
                    </Typography>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputProps={{ className: "text-white" }}
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
                            Login
                        </Button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
