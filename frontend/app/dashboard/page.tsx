"use client";

import { Typography, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-700 via-sky-600 to-indigo-800 p-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Card className="rounded-3xl shadow-2xl bg-white/10 backdrop-blur-lg border border-white/10">
                    <CardContent className="p-8 text-center">
                        <Typography
                            variant="h4"
                            className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400"
                        >
                            Dashboard
                        </Typography>
                        <Typography className="mt-4 text-black">
                            Welcome! Your clients will show up here soon.
                        </Typography>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
