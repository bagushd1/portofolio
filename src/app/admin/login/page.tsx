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
        <div className="min-h-screen flex items-center justify-center relative bg-[#f0f0f0] overflow-hidden p-4 md:p-8">
            {/* Decorative Bento Background Elements */}
            <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-primary border-4 border-foreground rotate-3 opacity-10 hidden md:block" />
            <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[50%] bg-secondary border-4 border-foreground -rotate-6 opacity-10 hidden md:block" />
            <div className="absolute top-[20%] right-[5%] w-[100px] h-[100px] bg-foreground rounded-full opacity-5" />
            
            <div className="relative z-10 w-full max-w-[450px]">
                {/* Brand Tag */}
                <div className="absolute -top-6 -left-4 z-20 bg-foreground text-background px-4 py-2 font-black uppercase text-xs tracking-[0.2em] shadow-[4px_4px_0px_0px_rgba(74,158,255,1)]">
                    Admin Portal
                </div>

                <div className="bg-white border-4 border-foreground shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                    <div className="p-8 border-b-4 border-foreground bg-primary">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-12 h-12 bg-white border-4 border-foreground flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] shrink-0">
                                <Lock className="w-6 h-6 text-foreground" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black uppercase tracking-tighter leading-none">RBA<span className="italic font-serif lowercase">dev.</span></h1>
                                <p className="text-[10px] font-black uppercase tracking-widest mt-1 opacity-70">Secured Control Center</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 space-y-8">
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-xs text-foreground uppercase tracking-[0.2em] font-black">Identitas Admin</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="admin@rbadev.id"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-12 bg-white border-2 border-foreground h-12 font-bold focus-visible:ring-0 focus-visible:border-primary transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <Label htmlFor="password" className="text-xs text-foreground uppercase tracking-[0.2em] font-black">Kata Sandi</Label>
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="pl-12 bg-white border-2 border-foreground h-12 font-bold focus-visible:ring-0 focus-visible:border-primary transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="brutalist-button w-full h-14 flex items-center justify-center gap-3 group mt-4"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
                                        <span className="font-black uppercase tracking-widest text-sm">MEMVERIFIKASI...</span>
                                    </div>
                                ) : (
                                    <>
                                        <span className="font-black uppercase tracking-widest text-sm text-foreground">MASUK KE DASHBOARD</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-foreground" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="pt-6 border-t-2 border-slate-100 text-center">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                                Access strictly restricted to RBAdev authorized personnel. <br />
                                All attempts are logged.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Credit */}
            <div className="absolute bottom-8 text-center w-full hidden md:block">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground opacity-20 italic">
                    Engineered by RBAdev Team © 2026
                </p>
            </div>
        </div>
    );
}
