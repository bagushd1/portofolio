"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, FileText, Upload } from "lucide-react";
import { createArticle, updateArticle, deleteArticle } from "@/lib/actions/article";
import { uploadImage } from "@/lib/actions/project"; // Reusing the project image uploader as it uses the same bucket
import Image from "next/image";

export default function ArticlesClient({ initialArticles }: { initialArticles: any[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form state
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [published, setPublished] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [currentImageUrl, setCurrentImageUrl] = useState("");

    const resetForm = () => {
        setTitle("");
        setSlug("");
        setDescription("");
        setContent("");
        setPublished(false);
        setFile(null);
        setCurrentImageUrl("");
        setEditingId(null);
    }

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) {
            resetForm();
        }
    }

    const handleEdit = (article: any) => {
        setTitle(article.title);
        setSlug(article.slug || "");
        setDescription(article.description || "");
        setContent(article.content);
        setPublished(article.published || false);
        setCurrentImageUrl(article.image_url || "");
        setEditingId(article.id);
        setIsOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = currentImageUrl;

            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                const uploadResult = await uploadImage(formData);

                if (uploadResult.error || !uploadResult.success) {
                    toast.error("Failed to upload image: " + uploadResult.error);
                    setLoading(false);
                    return;
                }
                imageUrl = uploadResult.url as string;
            }

            const data = {
                title,
                slug,
                description,
                content,
                image_url: imageUrl,
                published,
            };

            let result;
            if (editingId) {
                result = await updateArticle(editingId, data);
            } else {
                result = await createArticle(data);
            }

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(editingId ? "Article updated successfully!" : "Article created successfully!");
                setIsOpen(false);
                resetForm();
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this article? This action cannot be undone.")) return;

        setDeleteLoading(id);
        const result = await deleteArticle(id);
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success("Article deleted successfully");
        }
        setDeleteLoading(null);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Dialog open={isOpen} onOpenChange={handleOpenChange}>
                    <DialogTrigger
                        render={<button className="brutalist-button flex items-center gap-2 h-12 transform hover:-translate-x-1 hover:-translate-y-1 bg-primary text-foreground" />}
                    >
                        <Plus className="w-5 h-5 text-foreground" /> TULIS ARTIKEL BARU
                    </DialogTrigger>
                    <DialogContent className="max-w-7xl bg-white border-4 border-foreground rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] h-[95vh] flex flex-col p-0 overflow-hidden">
                        <DialogHeader className="p-8 border-b-4 border-foreground bg-primary shrink-0 text-left">
                            <DialogTitle className="text-4xl font-black uppercase tracking-tighter text-foreground leading-[0.9]">Redaksi Konten</DialogTitle>
                            <DialogDescription className="text-foreground font-bold opacity-80 italic text-sm mt-1">
                                Tuangkan pemikiran dan wawasan terbaru ke dalam platform RBAdev.
                            </DialogDescription>
                        </DialogHeader>
                        
                        <div className="overflow-y-auto flex-1 p-8 bg-white">
                            <form id="article-form" onSubmit={handleSubmit} className="space-y-10">
                                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                                    <div className="xl:col-span-4 space-y-6">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="title" className="text-xs text-foreground uppercase tracking-[0.2em] font-black">Judul Artikel Utama</Label>
                                                <Input id="title" required value={title} onChange={e => setTitle(e.target.value)} className="brutalist-input text-base px-4 h-12 font-bold" placeholder="E.g. Masa Depan Web Dev" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="slug" className="text-xs text-foreground uppercase tracking-[0.2em] font-black">Slug URL (Auto Path)</Label>
                                                <Input id="slug" value={slug} onChange={e => setSlug(e.target.value)} className="brutalist-input h-12 text-sm" placeholder="masa-depan-web-dev" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="description" className="text-xs text-foreground uppercase tracking-[0.2em] font-black">Ringkasan Meta (Excerpt)</Label>
                                                <Textarea id="description" rows={4} value={description} onChange={e => setDescription(e.target.value)} className="bg-white border-2 border-foreground font-medium resize-none p-4 rounded-2xl focus-visible:ring-0 focus-visible:border-primary transition-all text-xs leading-relaxed" placeholder="Ringkasan singkat untuk SEO..." />
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <Label htmlFor="image" className="text-xs text-foreground uppercase tracking-[0.2em] font-black">Sampul Artikel</Label>
                                            <div className="p-4 bg-slate-50 border-2 border-dashed border-foreground/20 rounded-2xl">
                                                {currentImageUrl && !file && (
                                                    <div className="relative aspect-video w-full mb-3 border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl overflow-hidden">
                                                        <Image src={currentImageUrl} alt="Current cover" fill className="object-cover" />
                                                    </div>
                                                )}
                                                <Input id="image" type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="brutalist-input flex-1 file:bg-primary file:font-black file:uppercase file:text-[10px] file:h-full file:border-0 file:border-r-2 file:border-foreground file:mr-4 file:px-4 h-10" />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-white border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-[1.5rem]">
                                            <div className="space-y-0.5">
                                                <Label className="text-xs font-black uppercase text-foreground">PUBLIKASI</Label>
                                            </div>
                                            <Switch checked={published} onCheckedChange={setPublished} className="data-[state=checked]:bg-primary" />
                                        </div>
                                    </div>

                                    <div className="xl:col-span-8 flex flex-col space-y-3">
                                        <Label htmlFor="content" className="text-xs text-foreground uppercase tracking-[0.2em] font-black">Editor Konten (Markdown)</Label>
                                        <Textarea 
                                            id="content" 
                                            required 
                                            value={content} 
                                            onChange={e => setContent(e.target.value)} 
                                            className="bg-white border-2 border-foreground resize-none flex-1 min-h-[400px] xl:min-h-0 font-mono text-sm leading-relaxed p-8 rounded-[2rem] focus-visible:ring-0 focus-visible:border-primary transition-all shadow-inner" 
                                            placeholder="# Tuliskan ide brilian anda di sini..." 
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>

                        <DialogFooter className="p-8 border-t-4 border-foreground bg-surface shrink-0">
                            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="border-4 border-foreground bg-white hover:bg-muted font-black uppercase text-[10px] tracking-widest px-10 h-12 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all hover:shadow-none">
                                Batalkan
                            </Button>
                            <button type="submit" form="article-form" disabled={loading} className="brutalist-button h-12 flex items-center justify-center min-w-[200px] text-[10px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                {loading ? <Loader2 className="w-5 h-5 mr-3 animate-spin" /> : "SIMPAN ARTIKEL"}
                            </button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="brutalist-card bg-white overflow-hidden">
                <Table className="border-collapse">
                    <TableHeader className="bg-foreground text-background border-b-4 border-foreground">
                        <TableRow className="hover:bg-transparent border-0 h-16">
                            <TableHead className="text-background font-black text-xs uppercase tracking-[0.2em] px-8 first:rounded-tl-[1.75rem]">DAFTAR ARTIKEL</TableHead>
                            <TableHead className="text-background font-black text-xs uppercase tracking-[0.2em] w-[140px]">STATUS</TableHead>
                            <TableHead className="text-background font-black text-xs uppercase tracking-[0.2em] text-right w-[150px] px-8 last:rounded-tr-[1.75rem]">KENDALI</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {initialArticles.length === 0 ? (
                            <TableRow className="hover:bg-transparent border-0">
                                <TableCell colSpan={3} className="h-32 text-center text-text-muted">
                                    No articles written yet. Time to share some knowledge!
                                </TableCell>
                            </TableRow>
                        ) : (
                            initialArticles.map((article) => (
                                <TableRow key={article.id} className="border-b border-surface-border/50 hover:bg-surface/30 transition-colors">
                                    <TableCell className="font-medium text-foreground py-4">
                                        <div className="flex items-center gap-3">
                                            {article.image_url ? (
                                                <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-surface-border flex-shrink-0">
                                                    <Image src={article.image_url} alt={article.title} fill className="object-cover" />
                                                </div>
                                            ) : (
                                                <div className="w-12 h-12 rounded-lg bg-surface border border-surface-border flex items-center justify-center flex-shrink-0 inner-glow">
                                                    <FileText className="w-5 h-5 text-text-dim" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-semibold text-foreground">{article.title}</p>
                                                <p className="text-xs text-text-muted font-normal mt-0.5 line-clamp-1 max-w-[400px]">
                                                    {article.description || "No excerpt provided."}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        {article.published ? (
                                            <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 shadow-none border-0 font-semibold px-2">Published</Badge>
                                        ) : (
                                            <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 shadow-none border-0 font-semibold px-2">Draft</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right py-6 px-8">
                                        <div className="flex items-center justify-end gap-3">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEdit(article)}
                                                className="border-2 border-foreground bg-white hover:bg-secondary hover:text-white h-10 w-10 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(article.id)}
                                                disabled={deleteLoading === article.id}
                                                className="border-2 border-foreground bg-white hover:bg-destructive hover:text-white h-10 w-10 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                                            >
                                                {deleteLoading === article.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
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
