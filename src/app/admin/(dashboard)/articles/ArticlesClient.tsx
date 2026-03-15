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
                        render={<Button className="bg-foreground text-background hover:bg-foreground/90 font-medium h-10 px-4 rounded-xl" />}
                    >
                        <Plus className="w-4 h-4 mr-2" /> Write Article
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl bg-surface border-surface-border rounded-xl shadow-lg h-[90vh] flex flex-col p-0 overflow-hidden">
                        <DialogHeader className="p-6 border-b border-surface-border bg-surface shrink-0">
                            <DialogTitle>{editingId ? "Edit Article" : "Write New Article"}</DialogTitle>
                            <DialogDescription className="text-text-muted">
                                Use Markdown for content formatting.
                            </DialogDescription>
                        </DialogHeader>
                        
                        <div className="overflow-y-auto flex-1 p-6">
                            <form id="article-form" onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="title" className="text-xs text-text-dim uppercase tracking-wider font-semibold">Title</Label>
                                            <Input id="title" required value={title} onChange={e => setTitle(e.target.value)} className="bg-background border-surface-border text-lg font-medium" placeholder="E.g. The Future of Web Dev" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="slug" className="text-xs text-text-dim uppercase tracking-wider font-semibold">Slug (Optional - Auto Generated)</Label>
                                            <Input id="slug" value={slug} onChange={e => setSlug(e.target.value)} className="bg-background border-surface-border" placeholder="the-future-of-web-dev" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="description" className="text-xs text-text-dim uppercase tracking-wider font-semibold">Excerpt / Meta Description</Label>
                                            <Textarea id="description" rows={3} value={description} onChange={e => setDescription(e.target.value)} className="bg-background border-surface-border resize-none" placeholder="A short summary of the article..." />
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <Label htmlFor="image" className="text-xs text-text-dim uppercase tracking-wider font-semibold">Cover Image</Label>
                                            <div className="flex items-center gap-4">
                                                {currentImageUrl && !file && (
                                                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-surface-border flex-shrink-0">
                                                        <Image src={currentImageUrl} alt="Current cover" fill className="object-cover" />
                                                    </div>
                                                )}
                                                <Input id="image" type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="bg-background border-surface-border cursor-pointer flex-1" />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-background border border-surface-border rounded-xl">
                                            <div className="space-y-0.5">
                                                <Label className="text-sm font-semibold text-foreground">Publish Status</Label>
                                                <p className="text-xs text-text-muted">Make this article visible to public.</p>
                                            </div>
                                            <Switch checked={published} onCheckedChange={setPublished} />
                                        </div>
                                    </div>

                                    <div className="space-y-2 h-full flex flex-col">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="content" className="text-xs text-text-dim uppercase tracking-wider font-semibold">Content (Markdown)</Label>
                                        </div>
                                        <Textarea 
                                            id="content" 
                                            required 
                                            value={content} 
                                            onChange={e => setContent(e.target.value)} 
                                            className="bg-background border-surface-border resize-none flex-1 min-h-[400px] font-mono text-sm leading-relaxed" 
                                            placeholder="# Hello World&#10;&#10;Write your majestic markdown here..." 
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>

                        <DialogFooter className="p-6 border-t border-surface-border bg-surface shrink-0">
                            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="border-surface-border bg-surface hover:bg-surface-light hover:text-foreground">
                                Cancel
                            </Button>
                            <Button type="submit" form="article-form" disabled={loading} className="bg-foreground text-background hover:bg-foreground/90">
                                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                {editingId ? "Save Changes" : "Create Article"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="border border-surface-border rounded-xl overflow-hidden bg-surface shadow-sm">
                <Table>
                    <TableHeader className="bg-surface border-b border-surface-border">
                        <TableRow className="hover:bg-transparent border-0">
                            <TableHead className="text-text-muted font-semibold h-12 text-xs uppercase tracking-wider">Article</TableHead>
                            <TableHead className="text-text-muted font-semibold h-12 text-xs uppercase tracking-wider w-[120px]">Status</TableHead>
                            <TableHead className="text-text-muted font-semibold h-12 text-xs uppercase tracking-wider text-right w-[100px]">Actions</TableHead>
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
                                    <TableCell className="text-right py-4">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEdit(article)}
                                                className="text-text-dim hover:text-foreground hover:bg-surface-light h-8 w-8 rounded-lg"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(article.id)}
                                                disabled={deleteLoading === article.id}
                                                className="text-text-dim hover:text-error hover:bg-error/10 h-8 w-8 rounded-lg"
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
