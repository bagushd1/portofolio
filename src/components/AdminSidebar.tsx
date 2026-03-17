"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
    LayoutDashboard, 
    FolderKanban, 
    MessageSquare, 
    LogOut, 
    Globe, 
    Briefcase, 
    FileText, 
    Handshake,
    Activity,
    Shield
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const supabase = createClient();
            await supabase.auth.signOut();
            toast.success("Berhasil logout");
            router.push("/admin/login");
            router.refresh();
        } catch (e) {
            toast.error("Gagal logout");
        }
    };

    const navItems = [
        { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Services", href: "/admin/services", icon: Briefcase },
        { name: "Projects", href: "/admin/projects", icon: FolderKanban },
        { name: "Partners", href: "/admin/partners", icon: Handshake },
        { name: "Blog", href: "/admin/articles", icon: FileText },
        { name: "Messages", href: "/admin/messages", icon: MessageSquare },
    ];

    return (
        <aside className="fixed top-6 left-6 bottom-6 w-64 bg-white border-4 border-foreground rounded-[2.5rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hidden md:flex flex-col z-50 overflow-hidden">
            {/* Blueprint Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            {/* Logo Mega-Tile */}
            <div className="p-6 pb-4 border-b-4 border-foreground relative bg-foreground/[0.02]">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 flex-shrink-0 bg-primary flex items-center justify-center border-4 border-foreground rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg] group-hover:rotate-0 transition-transform">
                        <Shield size={20} className="text-foreground" />
                    </div>
                    <div>
                        <span className="text-xl font-black uppercase tracking-tighter text-foreground block leading-none">
                            RBA<span className="text-primary italic font-serif lowercase">dev.</span>
                        </span>
                        <span className="text-[8px] font-black uppercase tracking-[0.3em] opacity-30">Console</span>
                    </div>
                </Link>
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 p-5 space-y-1 overflow-y-auto relative custom-scrollbar mt-2">
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-4 px-5 py-4 border-2 transition-all font-black uppercase text-[10px] tracking-widest rounded-2xl relative group ${isActive
                                ? "bg-primary border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-foreground translate-x-[-2px] translate-y-[-2px]"
                                : "bg-white/40 border-transparent text-foreground/40 hover:border-foreground/20 hover:text-foreground hover:bg-white"
                                }`}
                        >
                            <div className={`p-2 rounded-xl border-2 transition-colors ${isActive ? "bg-white border-foreground" : "bg-foreground/5 border-transparent group-hover:border-foreground/10"}`}>
                                <Icon size={16} />
                            </div>
                            {item.name}
                            {isActive && (
                                <motion.div 
                                    layoutId="active-pill"
                                    className="absolute right-4 w-1.5 h-1.5 bg-foreground rounded-full"
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Actions Professional Bento Grid */}
            <div className="p-5 pt-0 grid grid-cols-2 gap-3 relative">
                <Link
                    href="/"
                    target="_blank"
                    title="Visit Public Website"
                    className="flex flex-col items-center justify-center gap-2.5 p-4 bg-white border-4 border-foreground rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-secondary hover:text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all group"
                >
                    <div className="p-2 bg-foreground/5 rounded-lg group-hover:bg-white/20 transition-colors">
                        <Globe size={18} className="text-foreground group-hover:text-white" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest">Website</span>
                </Link>
                <button
                    onClick={handleLogout}
                    title="Logout from Console"
                    className="flex flex-col items-center justify-center gap-2.5 p-4 bg-white border-4 border-foreground rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-destructive hover:text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all group"
                >
                    <div className="p-2 bg-foreground/5 rounded-lg group-hover:bg-white/20 transition-colors">
                        <LogOut size={18} className="text-foreground group-hover:text-white" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest">Logout</span>
                </button>
            </div>
        </aside>
    );
}
