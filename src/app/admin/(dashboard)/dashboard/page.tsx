import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

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
        <div className="space-y-8 animate-fade-in-up">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-text-muted mt-2">Welcome back to your portfolio command center.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-surface-light border-surface-border shadow-none">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-text-muted">Total Projects</CardTitle>
                        <FolderKanban className="w-4 h-4 text-text-dim" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{projectsCount || 0}</div>
                        <p className="text-xs text-text-dim mt-1">Published in portfolio</p>
                    </CardContent>
                </Card>

                <Card className="bg-surface-light border-surface-border shadow-none">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-text-muted">Unread Messages</CardTitle>
                        <MessageSquare className="w-4 h-4 text-text-dim" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{unreadMessages || 0}</div>
                        <p className="text-xs text-text-dim mt-1">Waiting for response</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-surface-light border-surface-border shadow-none flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-lg">Recent Messages</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <div className="space-y-4">
                            {recentMessages?.length === 0 ? (
                                <p className="text-sm text-text-muted">No messages yet.</p>
                            ) : (
                                recentMessages?.map((msg) => (
                                    <div key={msg.id} className="flex items-start justify-between border-b border-surface-border pb-4 last:border-0 last:pb-0">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium flex items-center gap-2">
                                                {msg.name}
                                                {!msg.is_read && <Badge variant="default" className="bg-primary text-white text-[10px] h-4 px-1.5">NEW</Badge>}
                                            </p>
                                            <p className="text-xs text-text-dim">{msg.email}</p>
                                        </div>
                                        <div className="text-xs text-text-dim">
                                            {new Date(msg.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                    <div className="p-4 border-t border-surface-border mt-auto">
                        <Link href="/admin/messages" className="text-sm text-primary-light flex items-center hover:underline">
                            View all messages <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
}
