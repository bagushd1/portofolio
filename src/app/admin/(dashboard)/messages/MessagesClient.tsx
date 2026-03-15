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
            <div className="md:w-1/3 flex flex-col bg-white border-4 border-foreground overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] h-[calc(100vh-200px)] rounded-[2rem]">
                <div className="p-6 border-b-4 border-foreground bg-foreground text-background font-black text-xs uppercase tracking-[0.2em] flex items-center justify-between first:rounded-t-[1.8rem]">
                    Kotak Masuk
                    <span className="bg-primary text-foreground px-3 py-1 text-[10px] font-black rounded-full">
                        {initialMessages.length} PESAN
                    </span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {initialMessages.length === 0 ? (
                        <div className="p-8 text-center text-sm font-bold text-text-muted mt-10 italic">Tidak ada pesan masuk.</div>
                    ) : (
                        initialMessages.map(msg => (
                            <button
                                key={msg.id}
                                onClick={() => handleSelect(msg)}
                                className={`w-full text-left p-4 border-2 transition-all flex flex-col gap-2 rounded-2xl ${selectedMsgId === msg.id
                                    ? "bg-primary border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]"
                                    : "bg-background border-transparent hover:border-foreground hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                    }`}
                            >
                                <div className="flex justify-between items-start w-full gap-2">
                                    <span className={`text-xs uppercase tracking-tighter truncate ${msg.is_read ? 'text-text-muted font-bold' : 'font-black text-foreground'}`}>
                                        {msg.name}
                                    </span>
                                    <span className="text-[8px] text-text-dim whitespace-nowrap font-black uppercase tracking-widest opacity-50">
                                        {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
                                    </span>
                                </div>
                                <div className={`text-xs truncate w-full ${msg.is_read ? 'text-text-muted' : 'text-foreground font-bold'}`}>
                                    {msg.subject || "No Subject"}
                                </div>
                                {!msg.is_read && (
                                    <span className="bg-destructive text-white text-[8px] font-black h-4 px-2 flex items-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] w-fit mt-1 rounded-full">BARU</span>
                                )}
                            </button>
                        ))
                    )}
                </div>
            </div>

            {/* Right Detail Pane */}
            <div className="md:w-2/3 bg-white border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden h-[calc(100vh-200px)] rounded-[2rem]">
                {selectedMsg ? (
                    <>
                        <div className="p-8 border-b-4 border-foreground space-y-8 bg-surface">
                            <div className="flex justify-between items-start gap-4">
                                <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">{selectedMsg.subject || "Tanpa Subjek"}</h2>
                                <div className="flex gap-3 shrink-0">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-2 border-foreground bg-primary hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-black uppercase text-[10px] tracking-widest h-10 px-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                                        onClick={() => window.open(`mailto:${selectedMsg.email}`)}
                                    >
                                        <Reply className="w-4 h-4 mr-2" /> BALAS
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="border-2 border-foreground bg-white hover:bg-destructive hover:text-white transition-all h-10 w-10 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                                        onClick={() => handleDelete(selectedMsg.id)}
                                        disabled={loadingAction === `delete-${selectedMsg.id}`}
                                    >
                                        {loadingAction === `delete-${selectedMsg.id}` ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm font-bold">
                                <div className="flex items-center gap-3 bg-white px-4 py-2 border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-full text-xs">
                                    <User className="w-4 h-4 text-primary" />
                                    <span className="uppercase text-[10px] tracking-widest font-black">{selectedMsg.name}</span>
                                </div>
                                <div className="flex items-center gap-3 bg-white px-4 py-2 border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-full text-xs">
                                    <Mail className="w-4 h-4 text-secondary" />
                                    <a href={`mailto:${selectedMsg.email}`} className="hover:underline text-[10px] tracking-widest font-black">{selectedMsg.email}</a>
                                </div>
                                <div className="flex items-center gap-3 bg-white px-4 py-2 border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-full text-xs hidden lg:flex">
                                    <Calendar className="w-4 h-4 text-destructive" />
                                    <span className="text-[10px] tracking-widest font-black">{new Date(selectedMsg.created_at).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-10 flex-1 overflow-y-auto bg-white">
                            <div className="whitespace-pre-wrap text-lg leading-loose text-foreground font-medium italic font-serif">
                                "{selectedMsg.message}"
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-slate-50">
                        <div className="w-24 h-24 bg-primary border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mb-8 rotate-3 rounded-2xl">
                            <Mail className="w-12 h-12 text-foreground" />
                        </div>
                        <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Pilih Pesan</h3>
                        <p className="font-bold text-text-muted opacity-70 max-w-[300px]">Silakan pilih korespondensi dari kolom sebelah kiri untuk meninjau isi pesan.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
