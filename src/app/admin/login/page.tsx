"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            toast.error(error.message);
            setLoading(false);
            return;
        }

        toast.success("Login berhasil!");
        router.push("/admin/dashboard");
        router.refresh();
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative bg-surface-light">
            <div className="relative z-10 w-full max-w-[400px] p-8 bg-surface rounded-3xl shadow-xl border border-surface-border">
                <div className="flex flex-col items-center mb-8 text-center pb-6">
                    <div className="w-12 h-12 bg-surface-light rounded-2xl flex items-center justify-center mb-4 border border-surface-border shadow-sm">
                        <Lock className="w-5 h-5 text-foreground" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">System<span className="text-text-muted font-normal">.Login</span></h1>
                    <p className="text-text-muted text-sm mt-2">Secure access to the portfolio CMS</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs text-text-dim uppercase tracking-wider font-semibold">Email Address</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-text-dim" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-9 bg-surface border-surface-border focus-visible:ring-primary h-10"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-xs text-text-dim uppercase tracking-wider font-semibold">Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-text-dim" />
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-9 bg-surface border-surface-border focus-visible:ring-primary h-10"
                                required
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-foreground hover:bg-foreground/90 text-background font-medium h-10 mt-2"
                        disabled={loading}
                    >
                        {loading ? "Authenticating..." : "Sign In to Dashboard"}
                        {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
                    </Button>
                </form>
            </div>
        </div>
    );
}
