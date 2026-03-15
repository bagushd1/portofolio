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
                        render={<Button className="bg-foreground text-background hover:bg-foreground/90 font-medium h-10 px-4 rounded-xl" />}
                    >
                        <Plus className="w-4 h-4 mr-2" /> Add Service
                    </DialogTrigger>
                    <DialogContent className="max-w-xl bg-surface border-surface-border rounded-xl shadow-lg">
                        <DialogHeader>
                            <DialogTitle>{editingId ? "Edit Service" : "Add New Service"}</DialogTitle>
                            <DialogDescription className="text-text-muted">
                                Configure the services shown on the homepage.
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

                            <DialogFooter className="mt-6 border-t border-surface-border pt-4">
                                <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="border-surface-border bg-surface hover:bg-surface-light hover:text-foreground">
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={loading} className="bg-foreground text-background hover:bg-foreground/90">
                                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                    {editingId ? "Save Changes" : "Create Service"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="border border-surface-border rounded-xl overflow-hidden bg-surface shadow-sm">
                <Table>
                    <TableHeader className="bg-surface border-b border-surface-border">
                        <TableRow className="hover:bg-transparent border-0">
                            <TableHead className="text-text-muted font-semibold h-12 text-xs uppercase tracking-wider w-[80px]">Order</TableHead>
                            <TableHead className="text-text-muted font-semibold h-12 text-xs uppercase tracking-wider">Service</TableHead>
                            <TableHead className="text-text-muted font-semibold h-12 text-xs uppercase tracking-wider text-right w-[100px]">Actions</TableHead>
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
                                    <TableCell className="text-right py-4">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEdit(service)}
                                                className="text-text-dim hover:text-foreground hover:bg-surface-light h-8 w-8 rounded-lg"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(service.id)}
                                                disabled={deleteLoading === service.id}
                                                className="text-text-dim hover:text-error hover:bg-error/10 h-8 w-8 rounded-lg"
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
