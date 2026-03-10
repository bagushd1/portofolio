"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Trash2, Reply, CheckCircle2, User, Mail, Calendar, Loader2 } from "lucide-react";
import { deleteMessage, markAsRead } from "@/lib/actions/message";

export default function MessagesClient({ initialMessages }: { initialMessages: any[] }) {
    const [selectedMsgId, setSelectedMsgId] = useState<string | null>(null);
    const [loadingAction, setLoadingAction] = useState<string | null>(null);

    const selectedMsg = initialMessages.find(m => m.id === selectedMsgId);

    const handleMarkAsRead = async (id: string) => {
        await markAsRead(id);
    };

    const handleSelect = (msg: any) => {
        setSelectedMsgId(msg.id);
        if (!msg.is_read) {
            handleMarkAsRead(msg.id);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this message?")) return;

        setLoadingAction(`delete-${id}`);
        const result = await deleteMessage(id);
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success("Message deleted");
            if (selectedMsgId === id) setSelectedMsgId(null);
        }
        setLoadingAction(null);
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
            {/* Left List */}
            <div className="md:w-1/3 flex flex-col bg-surface border border-surface-border rounded-xl overflow-hidden shadow-sm">
                <div className="p-4 border-b border-surface-border bg-surface-light font-medium text-sm flex items-center justify-between">
                    All Messages
                    <Badge variant="secondary" className="bg-surface border-surface-border text-text-dim text-xs">
                        {initialMessages.length} Total
                    </Badge>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {initialMessages.length === 0 ? (
                        <div className="p-4 text-center text-sm text-text-muted mt-10">No messages found.</div>
                    ) : (
                        initialMessages.map(msg => (
                            <button
                                key={msg.id}
                                onClick={() => handleSelect(msg)}
                                className={`w-full text-left p-3 flex flex-col gap-1 transition-colors ${selectedMsgId === msg.id
                                    ? "bg-primary/5 border-l-2 border-l-primary"
                                    : "hover:bg-surface-light border-l-2 border-l-transparent"
                                    }`}
                            >
                                <div className="flex justify-between items-start w-full gap-2">
                                    <span className={`text-sm truncate ${msg.is_read ? 'text-text-dim' : 'font-semibold text-foreground'}`}>
                                        {msg.name}
                                    </span>
                                    <span className="text-[10px] text-text-dim whitespace-nowrap mt-0.5">
                                        {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
                                    </span>
                                </div>
                                <div className={`text-xs truncate w-full ${msg.is_read ? 'text-text-dim' : 'text-foreground font-medium'}`}>
                                    {msg.subject || "No Subject"}
                                </div>
                                {!msg.is_read && (
                                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-primary hover:bg-primary/90 text-white text-[9px] h-3.5 mt-1.5 w-fit">NEW</span>
                                )}
                            </button>
                        ))
                    )}
                </div>
            </div>

            {/* Right Detail Pane */}
            <div className="md:w-2/3 bg-surface border border-surface-border rounded-xl overflow-hidden shadow-sm flex flex-col">
                {selectedMsg ? (
                    <>
                        <div className="p-6 border-b border-surface-border space-y-5 bg-surface-light/30">
                            <div className="flex justify-between items-start">
                                <h2 className="text-xl font-bold tracking-tight">{selectedMsg.subject || "No Subject"}</h2>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 border-surface-border text-xs bg-surface"
                                        onClick={() => window.open(`mailto:${selectedMsg.email}`)}
                                    >
                                        <Reply className="w-3.5 h-3.5 mr-1" /> Reply
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-text-dim hover:text-error hover:bg-error/10"
                                        onClick={() => handleDelete(selectedMsg.id)}
                                        disabled={loadingAction === `delete-${selectedMsg.id}`}
                                    >
                                        {loadingAction === `delete-${selectedMsg.id}` ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3 text-sm text-text-dim">
                                <div className="flex items-center gap-2 bg-surface px-3 py-1.5 rounded-lg border border-surface-border inner-glow">
                                    <User className="w-4 h-4 text-text-dim" />
                                    <span className="text-foreground font-medium text-xs">{selectedMsg.name}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-surface px-3 py-1.5 rounded-lg border border-surface-border inner-glow">
                                    <Mail className="w-4 h-4 text-text-dim" />
                                    <a href={`mailto:${selectedMsg.email}`} className="text-foreground hover:underline text-xs">{selectedMsg.email}</a>
                                </div>
                                <div className="flex items-center gap-2 bg-surface px-3 py-1.5 rounded-lg border border-surface-border inner-glow hidden lg:flex">
                                    <Calendar className="w-4 h-4 text-text-dim" />
                                    <span className="text-foreground text-xs">{new Date(selectedMsg.created_at).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 flex-1 overflow-y-auto">
                            <div className="whitespace-pre-wrap text-sm leading-8 text-text-muted">
                                {selectedMsg.message}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-text-muted p-6 text-center">
                        <div className="w-16 h-16 bg-surface-light rounded-2xl flex items-center justify-center border border-surface-border mb-4 inner-glow">
                            <Mail className="w-8 h-8 text-text-dim" />
                        </div>
                        <p className="font-medium text-foreground">No message selected</p>
                        <p className="text-sm mt-1 max-w-[250px]">Select a message from the list on the left to read its contents.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
