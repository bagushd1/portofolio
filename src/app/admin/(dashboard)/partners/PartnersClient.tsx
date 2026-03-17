"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, Globe, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import { createPartner, updatePartner, deletePartner } from "@/lib/actions/partner";
import { uploadPartnerLogo } from "@/lib/actions/upload";
import Image from "next/image";

export default function PartnersClient({ initialPartners }: { initialPartners: any[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form state
    const [name, setName] = useState("");
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [orderIndex, setOrderIndex] = useState(0);
    const [logoUrl, setLogoUrl] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const resetForm = () => {
        setName("");
        setWebsiteUrl("");
        setOrderIndex(0);
        setLogoUrl("");
        setDescription("");
        setFile(null);
        setEditingId(null);
    }

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) resetForm();
    }

    const handleEdit = (partner: any) => {
        setName(partner.name);
        setWebsiteUrl(partner.website_url || "");
        setOrderIndex(partner.order_index || 0);
        setLogoUrl(partner.logo_url || "");
        setDescription(partner.description || "");
        setEditingId(partner.id);
        setIsOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let currentLogoUrl = logoUrl;

            if (file) {
                const uploadRes = await uploadPartnerLogo(file);
                if (uploadRes.error) throw new Error(uploadRes.error);
                currentLogoUrl = uploadRes.url || "";
            }

            const data = {
                name,
                logo_url: currentLogoUrl,
                description,
                website_url: websiteUrl,
                order_index: orderIndex,
            };

            let result;
            if (editingId) {
                result = await updatePartner(editingId, data);
            } else {
                result = await createPartner(data);
            }

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(editingId ? "Partner updated!" : "Partner created!");
                setIsOpen(false);
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Hapus partner ini?")) return;
        setDeleteLoading(id);
        const result = await deletePartner(id);
        if (result.error) toast.error(result.error);
        else toast.success("Partner deleted");
        setDeleteLoading(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <Dialog open={isOpen} onOpenChange={handleOpenChange}>
                    <DialogTrigger render={<button className="brutalist-button flex items-center gap-2 h-12 bg-primary text-foreground" />}>
                        <Plus className="w-5 h-5" /> TAMBAH PARTNER
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl bg-white border-4 border-foreground rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex flex-col p-0 overflow-hidden h-fit max-h-[95vh]">
                        <DialogHeader className="p-8 border-b-4 border-foreground bg-primary shrink-0 text-left">
                            <DialogTitle className="text-4xl font-black uppercase tracking-tighter text-foreground leading-[0.9]">Data Partner</DialogTitle>
                            <DialogDescription className="text-foreground font-bold opacity-80 italic text-sm mt-1">Registrasi identitas partner strategis RBAdev.</DialogDescription>
                        </DialogHeader>
                        
                        <div className="overflow-y-auto flex-1 p-8 bg-white">
                            <form id="partner-form" onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <Label className="text-xs font-black uppercase tracking-widest">Nama Instansi/Brand</Label>
                                            <Input required value={name} onChange={e => setName(e.target.value)} className="brutalist-input h-14" placeholder="E.g. GlobalTech Inc." />
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-xs font-black uppercase tracking-widest">Website URL (Opsional)</Label>
                                            <Input value={websiteUrl} onChange={e => setWebsiteUrl(e.target.value)} className="brutalist-input h-14" placeholder="https://..." />
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-xs font-black uppercase tracking-widest">Urutan Tampil</Label>
                                            <Input type="number" value={orderIndex} onChange={e => setOrderIndex(parseInt(e.target.value) || 0)} className="brutalist-input h-14" />
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <Label className="text-xs font-black uppercase tracking-widest">Logo Partner</Label>
                                        <div className="p-6 bg-slate-50 border-4 border-dashed border-foreground/10 rounded-[2rem] flex flex-col items-center justify-center text-center">
                                            {(logoUrl || file) ? (
                                                <div className="relative w-32 aspect-square border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl overflow-hidden mb-4 bg-white p-2 flex items-center justify-center">
                                                    <img src={file ? URL.createObjectURL(file) : logoUrl} alt="Preview" className="max-w-full max-h-full object-contain grayscale" />
                                                </div>
                                            ) : (
                                                <div className="w-16 h-16 rounded-full bg-white border-2 border-foreground/20 flex items-center justify-center mb-4">
                                                    <ImageIcon className="text-foreground/20 w-8 h-8" />
                                                </div>
                                            )}
                                            <Input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="brutalist-input file:bg-primary file:font-black file:uppercase file:text-[10px] file:h-full file:border-0 file:border-r-2 file:border-foreground file:mr-4 file:px-4 h-10" />
                                            <p className="text-[10px] font-bold text-foreground/40 mt-3 uppercase tracking-tighter italic">Recommended: PNG Square / SVG Transparent</p>
                                        </div>
                                    </div>
                                    <div className="md:col-span-2 space-y-3">
                                        <Label className="text-xs font-black uppercase tracking-widest">Cerita Kolaborasi (Markdown)</Label>
                                        <Textarea 
                                            value={description} 
                                            onChange={e => setDescription(e.target.value)} 
                                            className="bg-white border-2 border-foreground font-medium resize-none p-6 min-h-[150px] rounded-[2rem] focus-visible:ring-0 focus-visible:border-primary transition-all" 
                                            placeholder="Ceritakan bagaimana RBAdev membantu partner ini mencapai tujuannya..." 
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>

                        <DialogFooter className="p-8 border-t-4 border-foreground bg-slate-50 shrink-0">
                            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="border-4 border-foreground bg-white font-black h-12 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">BATAL</Button>
                            <button type="submit" form="partner-form" disabled={loading} className="brutalist-button h-12 min-w-[180px]">
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : editingId ? "UPDATE DATA" : "SIMPAN PARTNER"}
                            </button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="brutalist-card bg-white overflow-hidden border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-[2rem]">
                <Table>
                    <TableHeader className="bg-foreground">
                        <TableRow className="hover:bg-transparent h-16">
                            <TableHead className="text-background font-black text-xs uppercase tracking-widest px-8">Partner</TableHead>
                            <TableHead className="text-background font-black text-xs uppercase tracking-widest">Metadata</TableHead>
                            <TableHead className="text-background font-black text-xs uppercase tracking-widest text-right px-8">Control</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {initialPartners.length === 0 ? (
                            <TableRow><TableCell colSpan={3} className="h-32 text-center text-foreground/40 font-bold italic">No partners available.</TableCell></TableRow>
                        ) : (
                            initialPartners.map((partner) => (
                                <TableRow key={partner.id} className="border-b-2 border-slate-100 hover:bg-slate-50 transition-colors">
                                    <TableCell className="py-6 px-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-xl border-2 border-foreground bg-white p-2 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                {partner.logo_url ? (
                                                    <img src={partner.logo_url} alt={partner.name} className="max-w-full max-h-full object-contain grayscale" />
                                                ) : <ImageIcon className="text-foreground/10" />}
                                            </div>
                                            <div>
                                                <p className="font-black uppercase text-foreground leading-none mb-1">{partner.name}</p>
                                                <p className="text-[10px] font-bold text-primary bg-foreground inline-block px-1.5 py-0.5 rounded tracking-widest">RANK: #{partner.order_index}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {partner.website_url && (
                                            <a href={partner.website_url} target="_blank" className="inline-flex items-center gap-2 text-xs font-bold text-foreground hover:text-primary transition-colors">
                                                <LinkIcon size={14} /> Website Partner
                                            </a>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right px-8">
                                        <div className="flex items-center justify-end gap-3">
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(partner)} className="border-2 border-foreground bg-white hover:bg-primary h-10 w-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"><Pencil size={18} /></Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(partner.id)} disabled={deleteLoading === partner.id} className="border-2 border-foreground bg-white hover:bg-destructive hover:text-white h-10 w-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                {deleteLoading === partner.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
