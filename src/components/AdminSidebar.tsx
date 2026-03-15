"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FolderKanban, MessageSquare, LogOut, Globe, Briefcase, FileText } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

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
        { name: "Blog", href: "/admin/articles", icon: FileText },
        { name: "Messages", href: "/admin/messages", icon: MessageSquare },
    ];

    return (
        <div className="w-72 border-r-4 border-foreground bg-background min-h-screen flex-col hidden md:flex h-full fixed md:relative z-20">
            <div className="h-20 flex items-center px-8 border-b-4 border-foreground">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-primary flex items-center justify-center border-2 border-foreground rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <LayoutDashboard size={16} className="text-foreground" />
                    </div>
                    <span className="text-2xl font-black uppercase tracking-widest text-foreground">
                        RBA<span className="text-primary italic font-serif lowercase">dev.</span>
                    </span>
                </Link>
            </div>

            <nav className="flex-1 p-6 space-y-3 overflow-y-auto">
                <div className="px-2 text-[10px] font-black text-foreground uppercase tracking-[0.2em] mb-4 opacity-50">Sistem Kendali</div>
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 border-2 transition-all font-bold uppercase text-xs tracking-widest rounded-xl ${isActive
                                ? "bg-primary border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-foreground translate-x-[-2px] translate-y-[-2px]"
                                : "bg-white border-transparent text-text-muted hover:border-foreground hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:text-foreground"
                                }`}
                        >
                            <Icon size={18} className={isActive ? "text-foreground" : "text-text-dim"} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 border-t-4 border-foreground space-y-3 bg-surface">
                <Link
                    href="/"
                    target="_blank"
                    className="flex items-center gap-3 px-4 py-3 border-2 border-foreground bg-secondary text-background font-bold uppercase text-[10px] tracking-widest rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all mt-auto"
                >
                    <Globe size={16} className="text-background" />
                    Buka Website
                </Link>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 border-2 border-foreground bg-destructive text-background font-bold uppercase text-[10px] tracking-widest rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                >
                    <LogOut size={16} className="text-background" />
                    Keluar Sistem
                </button>
            </div>
        </div>
    );
}
