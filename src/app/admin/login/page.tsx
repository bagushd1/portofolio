"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { BentoCard } from "@/components/Admin/BentoCard";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

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

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#f0f0f0] p-4 md:p-8 flex items-center justify-center relative overflow-hidden font-sans">
            {/* Engineering Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
            />
            
            <div className="max-w-[900px] w-full grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                
                {/* 1. Branding Card */}
                <BentoCard className="bg-primary flex flex-col justify-end min-h-[300px] md:min-h-full py-10 overflow-hidden">
                    {/* Subtle Pattern Overlay */}
                    <div className="absolute inset-0 opacity-[0.15] pointer-events-none" 
                         style={{ 
                             backgroundImage: `radial-gradient(circle, #000 1.5px, transparent 1.5px)`, 
                             backgroundSize: '24px 24px' 
                         }} 
                    />
                    
                    <div className="flex justify-between items-start absolute top-10 left-8 right-8 z-10">
                        <div className="px-5 py-2 bg-foreground text-background text-[10px] font-black uppercase tracking-[0.3em] rounded-full">
                            Secure Access
                        </div>
                        <div className="w-12 h-12 bg-white border-4 border-foreground rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <ShieldCheck className="w-6 h-6 text-foreground" />
                        </div>
                    </div>
                    <div className="relative z-10">
                        <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.8] text-foreground">
                            RBA<span className="italic font-serif lowercase drop-shadow-sm">dev.</span>
                        </h1>
                    </div>
                </BentoCard>

                {/* 2. Login Card */}
                <BentoCard className="bg-white py-10">
                    <div className="space-y-8 h-full flex flex-col justify-center">
                        <div>
                            <h2 className="text-3xl font-black uppercase tracking-tighter text-foreground">Otentikasi</h2>
                            <p className="font-bold text-slate-400 text-[10px] mt-1 uppercase tracking-widest">Masukkan Kredensial Administrator</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 text-foreground ml-1">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="admin@rbadev.id"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="brutalist-input pl-12 h-14"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 text-foreground ml-1">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="brutalist-input pl-12 h-14"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="brutalist-button w-full h-14 flex items-center justify-center gap-3 bg-primary text-foreground mt-6 group"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-foreground border-t-transparent animate-spin rounded-full" />
                                        <span className="font-black uppercase tracking-widest text-xs">Processing...</span>
                                    </div>
                                ) : (
                                    <>
                                        <span className="font-black uppercase tracking-widest text-xs">Akses Dashboard</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </BentoCard>

            </div>
        </div>
    );
}
