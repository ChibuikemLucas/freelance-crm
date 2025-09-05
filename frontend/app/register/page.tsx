"use client";

import { useState } from "react";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ name, email, password });
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="w-96 shadow-lg rounded-2xl">
                    <CardContent>
                        <Typography variant="h5" className="mb-4 text-center">
                            Register
                        </Typography>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <TextField
                                label="Name"
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Create Account
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
