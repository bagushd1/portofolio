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
        <div className="w-64 border-r border-surface-border bg-surface min-h-screen flex-col hidden md:flex h-full fixed md:relative z-20">
            <div className="h-16 flex items-center px-6 border-b border-surface-border">
                <span className="text-xl font-bold tracking-tight text-foreground">RBA<span className="text-primary-light">Admin</span></span>
            </div>

            <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
                <div className="px-3 text-xs font-semibold text-text-dim uppercase tracking-wider mb-2 mt-2">Menu Utama</div>
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
                                ? "bg-primary/10 text-primary-light"
                                : "text-text-muted hover:bg-surface-light hover:text-foreground"
                                }`}
                        >
                            <Icon size={18} className={isActive ? "text-primary-light" : "text-text-dim"} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-surface-border space-y-1.5 bg-background/50">
                <Link
                    href="/"
                    target="_blank"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-text-muted hover:bg-surface-light hover:text-foreground transition-all"
                >
                    <Globe size={18} className="text-text-dim" />
                    View Website
                </Link>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-error hover:bg-error/10 transition-all text-left"
                >
                    <LogOut size={18} className="text-error/70" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
