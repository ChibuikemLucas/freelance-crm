"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden px-4 bg-gradient-to-br from-cyan-700 via-sky-600 to-indigo-800">
      {/* Decorative blurred blobs behind card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.18, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute -left-24 -top-24 w-72 h-72 rounded-full bg-gradient-to-br from-emerald-300 to-cyan-400 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.12, scale: 1.05 }}
        transition={{ duration: 1.4, delay: 0.2 }}
        className="pointer-events-none absolute -right-24 -bottom-20 w-96 h-96 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 blur-3xl"
      />

      {/* Main card with gradient border */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md rounded-3xl p-[2px] bg-gradient-to-r from-teal-400 via-sky-400 to-indigo-400 shadow-2xl"
      >
        {/* inner glass panel */}
        <div className="rounded-3xl bg-white/6 backdrop-blur-md border border-white/10 p-6 sm:p-10 flex flex-col items-center text-center">
          {/* Brand / Title */}
          <Typography
            component="h1"
            variant="h4"
            className="mb-2 w-full text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-indigo-200"
          >
            🚀 Freelance CRM
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="body2"
            className="mb-6 max-w-xs text-sm sm:text-base text-slate-100"
          >
            Track clients, proposals and important notes — lightweight, secure, and built
            for freelancers.
          </Typography>

          {/* Buttons — stacked on mobile, side-by-side on desktop */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 mb-2">
            <motion.div whileTap={{ scale: 0.985 }} whileHover={{ scale: 1.02 }}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => router.push("/login")}
                sx={{
                  borderRadius: "9999px",
                  py: 1.4,
                  fontWeight: 700,
                  textTransform: "none",
                  background: "linear-gradient(90deg,#0284C7 0%,#2563EB 100%)",
                  boxShadow: "0 6px 24px rgba(2,132,199,0.18)",
                  "&:hover": {
                    background: "linear-gradient(90deg,#0369A1 0%,#1E40AF 100%)",
                  },
                }}
                aria-label="Go to login"
              >
                Login
              </Button>
            </motion.div>

            <motion.div whileTap={{ scale: 0.985 }} whileHover={{ scale: 1.02 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => router.push("/register")}
                sx={{
                  borderRadius: "9999px",
                  py: 1.4,
                  fontWeight: 700,
                  textTransform: "none",
                  borderColor: "#7DD3FC",
                  color: "#7DD3FC",
                  "&:hover": {
                    borderColor: "#38BDF8",
                    color: "#0284C7",
                    backgroundColor: "rgba(14,165,233,0.06)",
                  },
                }}
                aria-label="Go to register"
              >
                Register
              </Button>
            </motion.div>
          </div>

          {/* micro-copy */}
          <Typography
            variant="caption"
            className="mt-4 text-[13px] text-slate-200"
          >
            Trusted by freelancers — built with security (JWT) & MongoDB.
          </Typography>
        </div>
      </motion.div>
    </div>
  );
}
