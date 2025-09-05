"use client";

import { Typography, Card, CardContent } from "@mui/material";

export default function DashboardPage() {
    return (
        <div className="p-6">
            <Card className="shadow-md rounded-xl">
                <CardContent>
                    <Typography variant="h4">Dashboard</Typography>
                    <Typography className="mt-2 text-gray-600">
                        Welcome! Your clients will show up here soon.
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}
