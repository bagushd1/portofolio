"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, LayoutGrid } from "lucide-react";
import { createService, updateService, deleteService } from "@/lib/actions/service";

export default function ServicesClient({ initialServices }: { initialServices: any[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState("");
    const [orderIndex, setOrderIndex] = useState(0);

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setIcon("");
        setOrderIndex(0);
        setEditingId(null);
    }

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) {
            resetForm();
        }
    }

    const handleEdit = (service: any) => {
        setTitle(service.title);
        setDescription(service.description);
        setIcon(service.icon || "");
        setOrderIndex(service.order_index || 0);
        setEditingId(service.id);
        setIsOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = {
                title,
                description,
                icon,
                order_index: orderIndex,
            };

            let result;
            if (editingId) {
                result = await updateService(editingId, data);
            } else {
                result = await createService({
                    ...data,
                    order_index: orderIndex || initialServices.length + 1
                });
            }

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(editingId ? "Service updated successfully!" : "Service created successfully!");
                setIsOpen(false);
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this service?")) return;

        setDeleteLoading(id);
        const result = await deleteService(id);
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success("Service deleted successfully");
        }
        setDeleteLoading(null);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Dialog open={isOpen} onOpenChange={handleOpenChange}>
                    <DialogTrigger
                        render={<button className="brutalist-button flex items-center gap-2 h-12 transform hover:-translate-x-1 hover:-translate-y-1" />}
                    >
                        <Plus className="w-5 h-5" /> TAMBAH LAYANAN
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl bg-white border-4 border-foreground rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col p-0 overflow-hidden">
                        <DialogHeader className="p-8 border-b-4 border-foreground bg-[#4a9eff] shrink-0 text-left">
                            <DialogTitle className="text-3xl font-black uppercase tracking-tighter text-white">{editingId ? "Edit Layanan" : "Layanan Baru"}</DialogTitle>
                            <DialogDescription className="text-white font-bold opacity-80">
                                Konfigurasi jenis layanan yang muncul di beranda RBAdev.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-xs text-text-dim uppercase tracking-wider font-semibold">Service Title</Label>
                                <Input id="title" required value={title} onChange={e => setTitle(e.target.value)} className="bg-background border-surface-border" placeholder="e.g. Sistem Terpadu" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-xs text-text-dim uppercase tracking-wider font-semibold">Description</Label>
                                <Textarea id="description" required rows={3} value={description} onChange={e => setDescription(e.target.value)} className="bg-background border-surface-border resize-none" placeholder="Brief description of the service..." />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="icon" className="text-xs text-text-dim uppercase tracking-wider font-semibold">Icon Name (Lucide)</Label>
                                    <Input id="icon" placeholder="Laptop, Layout, Database" value={icon} onChange={e => setIcon(e.target.value)} className="bg-background border-surface-border" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="order_index" className="text-xs text-text-dim uppercase tracking-wider font-semibold">Display Order</Label>
                                    <Input id="order_index" type="number" min="0" value={orderIndex} onChange={e => setOrderIndex(parseInt(e.target.value) || 0)} className="bg-background border-surface-border" />
                                </div>
                            </div>

                            <DialogFooter className="p-8 border-t-4 border-foreground bg-surface shrink-0 mt-4">
                                <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="border-2 border-foreground bg-white hover:bg-muted font-bold uppercase text-xs tracking-widest px-6 h-12 rounded-none">
                                    Batalkan
                                </Button>
                                <button type="submit" disabled={loading} className="brutalist-button h-12 flex items-center justify-center min-w-[160px]">
                                    {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "SIMPAN LAYANAN"}
                                </button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="brutalist-card bg-white overflow-hidden">
                <Table className="border-collapse">
                    <TableHeader className="bg-foreground text-background border-b-4 border-foreground">
                        <TableRow className="hover:bg-transparent border-0 h-16">
                            <TableHead className="text-background font-black text-xs uppercase tracking-[0.2em] px-8 w-[100px]">URUTAN</TableHead>
                            <TableHead className="text-background font-black text-xs uppercase tracking-[0.2em]">JENIS LAYANAN</TableHead>
                            <TableHead className="text-background font-black text-xs uppercase tracking-[0.2em] text-right w-[150px] px-8">KENDALI</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {initialServices.length === 0 ? (
                            <TableRow className="hover:bg-transparent border-0">
                                <TableCell colSpan={3} className="h-32 text-center text-text-muted">
                                    No services added yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            initialServices.map((service) => (
                                <TableRow key={service.id} className="border-b border-surface-border/50 hover:bg-surface/30 transition-colors">
                                    <TableCell className="font-medium text-foreground py-4">
                                        <div className="w-8 h-8 rounded-lg bg-background border border-surface-border flex items-center justify-center font-black text-xs text-text-dim">
                                            {service.order_index}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-surface border border-surface-border flex items-center justify-center flex-shrink-0 inner-glow">
                                                <LayoutGrid className="w-4 h-4 text-text-dim" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-foreground">{service.title}</p>
                                                <p className="text-xs text-text-muted font-normal mt-0.5 line-clamp-1 max-w-[300px]">{service.description}</p>
                                                {service.icon && (
                                                    <p className="text-[10px] text-text-dim font-black uppercase tracking-widest mt-1">Icon: {service.icon}</p>
                                                )}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right py-6 px-8">
                                        <div className="flex items-center justify-end gap-3">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEdit(service)}
                                                className="border-2 border-foreground bg-white hover:bg-secondary hover:text-white h-10 w-10 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(service.id)}
                                                disabled={deleteLoading === service.id}
                                                className="border-2 border-foreground bg-white hover:bg-destructive hover:text-white h-10 w-10 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                                            >
                                                {deleteLoading === service.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
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
