"use client";

import { ArrowRight, Code2, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const getLink = (hash: string) => {
        return isHome ? hash : `/${hash}`;
    };

    const navLinks = [
        { name: "Layanan", href: getLink("#services") },
        { name: "Portfolio", href: "/work" },
        { name: "Blog", href: "/blog" },
        { name: "Partners", href: "/partners" },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-6 md:px-12 ${
            isScrolled ? "pt-2 md:pt-4" : "pt-4 md:pt-6"
        }`}>
            {/* The Floating Bento Capsule */}
            <nav className={`max-w-[1400px] mx-auto transition-all duration-500 rounded-[2.5rem] border-4 border-foreground overflow-hidden flex items-stretch shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${
                isScrolled ? "bg-white/90 backdrop-blur-md scale-[0.98] h-16 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : "bg-white h-20"
            }`}>
                
                {/* Box 1: Logo */}
                <div className="border-r-4 border-foreground bg-white hover:bg-primary transition-colors duration-300 group px-6 md:px-10 flex items-center justify-center">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-foreground flex items-center justify-center rounded-lg rotate-3 group-hover:rotate-12 transition-transform">
                            <Code2 className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-xl md:text-2xl font-black uppercase tracking-tighter text-foreground">
                            RBA<span className="italic">dev.</span>
                        </span>
                    </Link>
                </div>

                {/* Box 2: Navigation (Desktop Only) */}
                <div className="hidden md:flex flex-1 items-stretch justify-center border-r-4 border-foreground bg-white/50 backdrop-blur-sm px-2 lg:px-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`px-6 lg:px-8 flex items-center text-[10px] lg:text-xs font-black uppercase tracking-[0.2em] transition-all hover:bg-foreground hover:text-background border-x border-foreground/5 first:border-l-0 last:border-r-0 ${
                                pathname.startsWith(link.href) ? "bg-foreground/5 text-secondary" : "text-foreground opacity-70"
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Box 3: Action & Mobile Toggle */}
                <div className="flex-1 md:flex-none flex justify-end bg-primary hover:bg-white transition-colors duration-300 group">
                    {/* Desktop CTA */}
                    <a
                        href={getLink("#contact")}
                        className="hidden md:flex items-center gap-3 px-8 text-xs font-black uppercase tracking-[0.2em] group-hover:translate-x-1 transition-transform border-l-4 border-foreground h-full"
                    >
                        Konsultasi <ArrowRight className="w-4 h-4" />
                    </a>

                    {/* Mobile Toggle */}
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden w-16 h-full flex items-center justify-center active:bg-foreground active:text-background transition-colors"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Hybrid Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden mt-4 bg-background border-4 border-foreground rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden animate-in zoom-in-95 duration-300">
                    <div className="flex flex-col">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="px-8 py-5 border-b-2 border-foreground/10 text-lg font-black uppercase tracking-tighter hover:bg-primary transition-colors flex justify-between items-center group"
                            >
                                {link.name}
                                <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                            </Link>
                        ))}
                        <a
                            href={getLink("#contact")}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="px-8 py-6 bg-foreground text-background text-xl font-black uppercase tracking-tighter flex justify-between items-center"
                        >
                            Mulai Sekarang <ArrowRight size={24} />
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
