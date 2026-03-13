"use client";

import { ArrowRight, Code2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    const isHome = pathname === "/";

    const getLink = (hash: string) => {
        return isHome ? hash : `/${hash}`;
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b-4 border-foreground w-full overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 md:gap-3 group">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-primary flex items-center justify-center border-2 md:border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-y-1 group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                        <Code2 className="w-4 h-4 md:w-6 md:h-6 text-primary-foreground" />
                    </div>
                    <span className="text-xl md:text-2xl font-black uppercase tracking-widest text-foreground">
                        Nexus<span className="text-primary hidden sm:inline">Tech.</span>
                        <span className="text-primary sm:hidden">.</span>
                    </span>
                </Link>
                <div className="hidden md:flex items-center gap-8">
                    <a
                        href={getLink("#services")}
                        className="text-sm font-black uppercase tracking-wider text-foreground hover:text-primary transition-colors"
                    >
                        Layanan
                    </a>
                    <a
                        href={getLink("#work")}
                        className="text-sm font-black uppercase tracking-wider text-foreground hover:text-primary transition-colors"
                    >
                        Portfolio
                    </a>
                    <Link
                        href="/blog"
                        className={`text-sm font-black uppercase tracking-wider transition-colors ${pathname.startsWith("/blog") ? "text-primary" : "text-foreground hover:text-primary"
                            }`}
                    >
                        Blog
                    </Link>
                    <a
                        href={getLink("#contact")}
                        className="text-sm font-black uppercase tracking-wider px-6 py-2.5 bg-[#fff133] text-foreground border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2"
                    >
                        Konsultasi <ArrowRight className="w-5 h-5" />
                    </a>
                </div>
                <div className="flex md:hidden items-center">
                    <a
                        href={getLink("#contact")}
                        className="text-[10px] sm:text-xs font-black uppercase tracking-wider px-3 sm:px-4 py-1.5 sm:py-2 bg-[#fff133] text-foreground border-2 sm:border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center"
                    >
                        Mulai <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                    </a>
                </div>
            </div>
        </nav>
    );
}
