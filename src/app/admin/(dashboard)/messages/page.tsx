import { createClient } from "@/lib/supabase/server";
import MessagesClient from "./MessagesClient";

export default async function MessagesPage() {
    const supabase = await createClient();
    const { data: messages, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        return <div className="p-6 text-error">Error loading messages: {error.message}</div>;
    }

    return (
        <div className="space-y-6 animate-fade-in-up h-[calc(100vh-8rem)] flex flex-col">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Inbox</h1>
                <p className="text-text-muted mt-2">Manage inquiries and messages from public clients.</p>
            </div>

            <MessagesClient initialMessages={messages || []} />
        </div>
    );
}
