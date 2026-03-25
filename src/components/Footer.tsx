// Server Component — no client-side interactivity needed

import Link from "next/link";
import { ArrowRight, Code2, Globe, ExternalLink } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background pt-24 pb-12 px-6 border-t-4 border-foreground relative overflow-hidden">
            {/* Blueprint Grid Continuation */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="max-w-[1400px] mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
                    
                    {/* 1. Major Identity Box */}
                    <div className="md:col-span-12 lg:col-span-8 bg-white border-4 border-foreground rounded-[2.5rem] md:rounded-[3.5rem] p-10 md:p-16 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row gap-12 items-center justify-between group">
                        <div className="flex-1">
                            <div className="inline-flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 bg-primary border-4 border-foreground rounded-2xl flex items-center justify-center rotate-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <Code2 className="w-8 h-8 text-foreground" />
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">RBA<span className="italic font-serif text-secondary">dev.</span></h2>
                            </div>
                            <p className="text-xl md:text-2xl font-bold font-serif italic text-foreground/60 max-w-lg leading-tight">
                                "Kami tidak hanya membangun platform; kami merancang ekosistem pertumbuhan digital Anda."
                            </p>
                        </div>
                        <div className="flex flex-col gap-4 w-full md:w-auto">
                            <Link href="/#contact" className="px-10 py-5 bg-foreground text-background font-black uppercase tracking-widest text-sm rounded-2xl shadow-[6px_6px_0px_0px_rgba(255,241,51,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-center">
                                Start Project
                            </Link>
                            <Link href="/partners" className="px-10 py-5 bg-primary border-4 border-foreground text-foreground font-black uppercase tracking-widest text-sm rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-center">
                                Be Partner
                            </Link>
                        </div>
                    </div>

                    {/* 2. Global Accents Box */}
                    <div className="md:col-span-12 lg:col-span-4 bg-secondary border-4 border-foreground rounded-[2.5rem] md:rounded-[3.5rem] p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center text-center overflow-hidden relative group">
                        <Globe className="w-32 h-32 text-background/20 mb-6 animate-pulse" />
                        <h3 className="text-2xl font-black text-background uppercase tracking-widest mb-2">Remote First</h3>
                        <p className="text-background/60 font-bold uppercase tracking-widest text-xs">Serving Globally from Semarang, ID</p>
                        
                        {/* Decorative background circle */}
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                    </div>

                    {/* 3. Navigation Bento Strip (2 Blocks Only — Real Links) */}
                    <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Navigation Links */}
                        <div className="bg-white border-4 border-foreground rounded-[2rem] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] transition-all group">
                            <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-8 border-b-2 border-foreground/10 pb-4">Navigation</h4>
                            <ul className="space-y-4">
                                {[
                                    { label: "Portfolio", href: "/work" },
                                    { label: "Blog", href: "/blog" },
                                    { label: "Layanan", href: "/#services" },
                                    { label: "Partners", href: "/partners" },
                                ].map(link => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="flex items-center justify-between text-sm font-bold opacity-60 hover:opacity-100 transition-all group/link">
                                            {link.label} <ArrowRight className="w-4 h-4 -rotate-45 opacity-0 group-hover/link:opacity-100 transition-all" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services / Focus Links */}
                        <div className="bg-primary border-4 border-foreground rounded-[2rem] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] transition-all group">
                            <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-8 border-b-2 border-foreground/10 pb-4">Layanan Kami</h4>
                            <ul className="space-y-4">
                                {[
                                    "Custom Web App",
                                    "Fintech & CRM",
                                    "B2B SaaS",
                                    "Design System",
                                ].map(item => (
                                    <li key={item}>
                                        <Link href="/#services" className="flex items-center justify-between text-sm font-bold opacity-60 hover:opacity-100 transition-all group/link">
                                            {item} <ArrowRight className="w-4 h-4 -rotate-45 opacity-0 group-hover/link:opacity-100 transition-all" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>

                {/* 4. Professional Bottom Bar */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pt-12 border-t-4 border-foreground/5">
                    
                    {/* Copyright */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <p className="text-xs font-black uppercase tracking-[0.3em] mb-1">© {currentYear} RBA Development</p>
                        <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">
                            Semarang, Indonesia
                        </p>
                    </div>

                    {/* Legal Links Pill */}
                    <div className="inline-flex items-center gap-6 px-8 py-4 bg-white border-2 border-foreground rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <Link href="/privacy" className="text-[10px] font-black text-foreground uppercase tracking-widest hover:text-primary transition-colors">Privacy</Link>
                        <Link href="/terms" className="text-[10px] font-black text-foreground uppercase tracking-widest hover:text-primary transition-colors">Terms</Link>
                        <div className="w-1.5 h-1.5 bg-foreground/10 rounded-full"></div>
                        <a href="mailto:hello@rbadev.com" className="flex items-center gap-2 text-[10px] font-black text-foreground uppercase tracking-widest hover:text-primary transition-colors">
                            Support <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
