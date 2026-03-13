"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Trash2, Loader2, Settings2, GripVertical } from "lucide-react";
import { createService, deleteService, updateService } from "@/lib/actions/service";
import { Service } from "@/lib/api/portfolio";

export default function ServicesClient({ initialServices }: { initialServices: Service[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

    // Form states
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState("");
    const [orderIndex, setOrderIndex] = useState("0");

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setIcon("");
        setOrderIndex("0");
    }

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) {
            resetForm();
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await createService({
                title,
                description,
                icon,
                order_index: parseInt(orderIndex) || 0,
            });

            if (result.error) {
                toast.error("Failed to create service: " + result.error);
            } else {
                toast.success("Service created successfully!");
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
                    <DialogTrigger render={<Button className="bg-foreground text-background hover:bg-foreground/90 font-medium h-10 px-4 rounded-xl" />}>
                        <Plus className="w-4 h-4 mr-2" /> Add Service
                    </DialogTrigger>
                    <DialogContent className="max-w-md bg-surface border-surface-border rounded-xl shadow-lg">
                        <DialogHeader>
                            <DialogTitle>Add New Service</DialogTitle>
                            <DialogDescription className="text-text-muted">
                                These services will appear in the "Services" section of your landing page.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-xs text-text-dim uppercase tracking-wider font-semibold">Service Title</Label>
                                <Input id="title" required value={title} onChange={e => setTitle(e.target.value)} className="bg-background border-surface-border" placeholder="e.g. Web Development" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-xs text-text-dim uppercase tracking-wider font-semibold">Description</Label>
                                <Textarea id="description" required rows={3} value={description} onChange={e => setDescription(e.target.value)} className="bg-background border-surface-border resize-none" placeholder="Short description of the service" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="icon" className="text-xs text-text-dim uppercase tracking-wider font-semibold">Lucide Icon Name</Label>
                                    <Input id="icon" placeholder="Laptop, Globe, etc." value={icon} onChange={e => setIcon(e.target.value)} className="bg-background border-surface-border" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="order" className="text-xs text-text-dim uppercase tracking-wider font-semibold">Order Index</Label>
                                    <Input id="order" type="number" value={orderIndex} onChange={e => setOrderIndex(e.target.value)} className="bg-background border-surface-border" />
                                </div>
                            </div>

                            <DialogFooter className="mt-6 border-t border-surface-border pt-4">
                                <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="border-surface-border bg-surface hover:bg-surface-light">
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={loading} className="bg-foreground text-background hover:bg-foreground/90 font-black uppercase">
                                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                    Save Service
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
                            <TableHead className="text-text-muted font-semibold h-12 text-xs uppercase tracking-wider w-[50px]">Order</TableHead>
                            <TableHead className="text-text-muted font-semibold h-12 text-xs uppercase tracking-wider">Service</TableHead>
                            <TableHead className="text-text-muted font-semibold h-12 text-xs uppercase tracking-wider">Icon</TableHead>
                            <TableHead className="text-text-muted font-semibold h-12 text-xs uppercase tracking-wider text-right w-[80px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {initialServices.length === 0 ? (
                            <TableRow className="hover:bg-transparent border-0">
                                <TableCell colSpan={4} className="h-32 text-center text-text-muted">
                                    No services added yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            initialServices.map((service) => (
                                <TableRow key={service.id} className="border-b border-surface-border/50 hover:bg-surface/30 transition-colors">
                                    <TableCell className="text-text-dim font-bold">{service.order_index}</TableCell>
                                    <TableCell className="font-medium text-foreground py-4">
                                        <div>
                                            <p className="font-black uppercase tracking-tight">{service.title}</p>
                                            <p className="text-xs text-text-muted font-normal mt-0.5 line-clamp-1">{service.description}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-text-dim text-xs font-mono">{service.icon || "-"}</TableCell>
                                    <TableCell className="text-right py-4">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(service.id)}
                                            disabled={deleteLoading === service.id}
                                            className="text-text-dim hover:text-error hover:bg-error/10 h-8 w-8 rounded-lg"
                                        >
                                            {deleteLoading === service.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                        </Button>
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
