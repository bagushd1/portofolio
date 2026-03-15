import { createClient } from "@/lib/supabase/server";
import { FolderKanban, MessageSquare, Globe } from "lucide-react";
import Link from "next/link";

export default async function DashboardOverview() {
    const supabase = await createClient();

    // Fetch counts
    const { count: projectsCount } = await supabase.from("projects").select("*", { count: "exact", head: true });
    const { count: unreadMessages } = await supabase.from("messages").select("*", { count: "exact", head: true }).eq("is_read", false);

    // Fetch recent messages
    const { data: recentMessages } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

    return (
        <div className="space-y-12 animate-fade-in-up pb-20">
            <div>
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Kendali <span className="text-foreground italic font-serif lowercase">Dashboard</span></h1>
                <p className="text-text-muted mt-4 font-bold text-lg">Pusat komando digital platform RBAdev Anda.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="brutalist-card p-8 bg-[#4a9eff] text-white">
                    <div className="flex justify-between items-start mb-6">
                        <span className="text-xs font-black uppercase tracking-widest opacity-80">Total Proyek</span>
                        <FolderKanban className="w-6 h-6" />
                    </div>
                    <div className="text-6xl font-black tracking-tighter mb-2">{projectsCount || 0}</div>
                    <p className="text-sm font-bold opacity-80 uppercase tracking-wider">Karya terpublikasi</p>
                </div>

                <div className="brutalist-card p-8 bg-[#fff133] text-foreground">
                    <div className="flex justify-between items-start mb-6">
                        <span className="text-xs font-black uppercase tracking-widest opacity-70">Pesan Baru</span>
                        <MessageSquare className="w-6 h-6" />
                    </div>
                    <div className="text-6xl font-black tracking-tighter mb-2">{unreadMessages || 0}</div>
                    <p className="text-sm font-bold opacity-70 uppercase tracking-wider">Menunggu respon</p>
                </div>
            </div>

            <div className="grid gap-10 md:grid-cols-2">
                <div className="brutalist-card p-8 flex flex-col bg-white overflow-hidden">
                    <div className="flex justify-between items-center mb-8 bg-foreground text-background -mx-8 -mt-8 p-6 px-8 rounded-t-[1.75rem]">
                        <h3 className="text-xl font-black uppercase tracking-widest">Pesan Terbaru</h3>
                        <Link href="/admin/messages" className="text-[10px] font-black uppercase bg-primary text-foreground px-4 py-1.5 border-2 border-foreground rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-foreground transition-all">Lihat Semua</Link>
                    </div>
                    <div className="space-y-6">
                        {recentMessages?.length === 0 ? (
                            <p className="text-sm font-bold text-text-muted italic">Belum ada pesan masuk.</p>
                        ) : (
                            recentMessages?.map((msg) => (
                                <div key={msg.id} className="group border-b-2 border-foreground/10 pb-6 last:border-0 last:pb-0 hover:translate-x-1 transition-transform">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="space-y-1">
                                            <p className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
                                                {msg.name}
                                                {!msg.is_read && <span className="bg-destructive text-white text-[8px] font-black h-4 px-2 flex items-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-full">BARU</span>}
                                            </p>
                                            <p className="text-xs font-bold text-text-muted">{msg.email}</p>
                                        </div>
                                        <div className="text-[10px] font-black opacity-40 uppercase tracking-widest">
                                            {new Date(msg.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <p className="text-sm text-foreground/70 line-clamp-2 font-medium">{msg.message}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="brutalist-card p-10 bg-[#bbf7d0] flex flex-col items-center justify-center text-center space-y-6">
                    <div className="w-20 h-20 bg-background border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center rotate-3 rounded-2xl">
                        <Globe className="w-10 h-10 text-foreground" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Live Status</h3>
                        <p className="text-sm font-bold opacity-70">Platform RBAdev berjalan optimal. Unit bisnis terus terpantau aman.</p>
                    </div>
                    <a href="/" target="_blank" className="brutalist-button text-xs py-2">Monitor Platform</a>
                </div>
            </div>
        </div>
    );
}
