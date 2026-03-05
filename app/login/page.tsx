"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== "password") {
            setError("Invalid password");
            return;
        }

        let role = "";
        let finalId = email.trim();

        if (finalId === "staff@lms.com") {
            role = "staff";
        } else {
            // Assume any other ID is a student's Roll No.
            role = "student";
        }

        // Set static auth mock session
        localStorage.setItem("mockUserRole", role);
        localStorage.setItem("mockUserEmail", finalId);

        // Redirect to home page
        router.push("/");
    };

    return (
        <div className="flex h-screen w-full items-center justify-center p-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email or Roll No</Label>
                            <Input
                                id="email"
                                type="text"
                                placeholder="staff@lms.com or 130722205001"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                            Login
                        </Button>
                        <div className="mt-4 text-center text-sm text-muted-foreground">
                            <p>Demo staff account: <strong>staff@lms.com</strong></p>
                            <p className="mt-1">Students: Enter your Roll Number</p>
                            <p className="text-xs mt-1 opacity-70">(e.g., 130722205001)</p>
                            <p className="mt-2 font-bold text-xs">Password is "password" for all.</p>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
