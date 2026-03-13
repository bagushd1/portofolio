"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Trash2, Loader2, FileText, Globe, Eye, EyeOff } from "lucide-react";
import { createArticle, deleteArticle, updateArticle } from "@/lib/actions/article";
import { Article } from "@/lib/api/portfolio";

export default function ArticlesClient({ initialArticles }: { initialArticles: Article[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

    // Form states
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [published, setPublished] = useState(false);

    const resetForm = () => {
        setTitle("");
        setSlug("");
        setDescription("");
        setContent("");
        setPublished(false);
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
            const result = await createArticle({
                title,
                slug: slug || undefined,
                description,
                content,
                published,
            });

            if (result.error) {
                toast.error("Failed to create article: " + result.error);
            } else {
                toast.success("Article created successfully!");
                setIsOpen(false);
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this article?")) return;

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
                    <DialogTrigger render={<Button className="bg-foreground text-background hover:bg-foreground/90 font-medium h-10 px-4 rounded-xl" />}>
                        <Plus className="w-4 h-4 mr-2" /> New Article
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl bg-surface border-surface-border rounded-xl shadow-lg">
                        <DialogHeader>
                            <DialogTitle>Compose Article</DialogTitle>
                            <DialogDescription className="text-text-muted">
                                Write detailed insights or technical documentations.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-xs text-text-dim uppercase tracking-wider font-semibold">Title</Label>
                                    <Input id="title" required value={title} onChange={e => setTitle(e.target.value)} className="bg-background border-surface-border" placeholder="The Future of Web Architecture" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="slug" className="text-xs text-text-dim uppercase tracking-wider font-semibold">Slug (Optional)</Label>
                                    <Input id="slug" value={slug} onChange={e => setSlug(e.target.value)} className="bg-background border-surface-border" placeholder="future-web-architecture" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-xs text-text-dim uppercase tracking-wider font-semibold">Short Summary / Meta Description</Label>
                                <Input id="description" value={description} onChange={e => setDescription(e.target.value)} className="bg-background border-surface-border" placeholder="Brief intro to the article..." />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content" className="text-xs text-text-dim uppercase tracking-wider font-semibold">Content (Markdown)</Label>
                                <Textarea id="content" required rows={10} value={content} onChange={e => setContent(e.target.value)} className="bg-background border-surface-border resize-none" placeholder="Start writing your masterpiece..." />
                            </div>

                            <div className="flex items-center space-x-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="published"
                                    checked={published}
                                    onChange={(e) => setPublished(e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <Label htmlFor="published" className="text-xs font-bold uppercase tracking-wider text-foreground cursor-pointer">Publish immediately</Label>
                            </div>

                            <DialogFooter className="mt-6 border-t border-surface-border pt-4">
                                <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="border-surface-border bg-surface hover:bg-surface-light">
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={loading} className="bg-foreground text-background hover:bg-foreground/90 font-black uppercase tracking-widest">
                                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                    Save Article
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
                            <TableHead className="text-text-muted font-semibold h-12 text-xs uppercase tracking-wider">Article</TableHead>
                            <TableHead className="text-text-muted font-semibold h-12 text-xs uppercase tracking-wider">Status</TableHead>
                            <TableHead className="text-text-muted font-semibold h-12 text-xs uppercase tracking-wider">Date</TableHead>
                            <TableHead className="text-text-muted font-semibold h-12 text-xs uppercase tracking-wider text-right w-[80px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {initialArticles.length === 0 ? (
                            <TableRow className="hover:bg-transparent border-0">
                                <TableCell colSpan={4} className="h-32 text-center text-text-muted">
                                    No articles published yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            initialArticles.map((article) => (
                                <TableRow key={article.id} className="border-b border-surface-border/50 hover:bg-surface/30 transition-colors">
                                    <TableCell className="font-medium text-foreground py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-surface border border-surface-border flex items-center justify-center flex-shrink-0">
                                                <FileText className="w-4 h-4 text-text-dim" />
                                            </div>
                                            <div>
                                                <p className="font-bold">{article.title}</p>
                                                <p className="text-xs text-text-muted font-normal mt-0.5 line-clamp-1">/{article.slug}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {article.published ? (
                                            <Badge className="bg-success/10 text-success border-success/20 font-bold uppercase text-[10px]">
                                                <Eye className="w-3 h-3 mr-1" /> Published
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary" className="bg-surface border-surface-border text-text-muted font-bold uppercase text-[10px]">
                                                <EyeOff className="w-3 h-3 mr-1" /> Draft
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-text-dim text-xs">
                                        {new Date(article.created_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right py-4">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(article.id)}
                                            disabled={deleteLoading === article.id}
                                            className="text-text-dim hover:text-error hover:bg-error/10 h-8 w-8 rounded-lg"
                                        >
                                            {deleteLoading === article.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
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
