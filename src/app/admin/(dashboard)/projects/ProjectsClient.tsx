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
import { Plus, Pencil, Trash2, ExternalLink, Github, Loader2, FolderKanban } from "lucide-react";
import { createProject, updateProject, deleteProject, uploadImage } from "@/lib/actions/project";
import Image from "next/image";

export default function ProjectsClient({ initialProjects }: { initialProjects: any[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [currentImageUrl, setCurrentImageUrl] = useState("");

    // Form stats
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [techStack, setTechStack] = useState("");
    const [liveLink, setLiveLink] = useState("");
    const [challenge, setChallenge] = useState("");
    const [solution, setSolution] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const resetForm = () => {
        setTitle("");
        setSlug("");
        setDescription("");
        setTechStack("");
        setLiveLink("");
        setChallenge("");
        setSolution("");
        setContent("");
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

    const handleEdit = (project: any) => {
        setTitle(project.title || "");
        setSlug(project.slug || "");
        setDescription(project.description || "");
        setTechStack(project.tech_stack?.join(", ") || "");
        setLiveLink(project.live_link || "");
        setChallenge(project.challenge || "");
        setSolution(project.solution || "");
        setContent(project.content || "");
        setCurrentImageUrl(project.image_url || "");
        setEditingId(project.id);
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

            const techStackArray = techStack.split(",").map(t => t.trim()).filter(Boolean);

            const projectData = {
                title,
                slug,
                description,
                tech_stack: techStackArray,
                live_link: liveLink,
                challenge,
                solution,
                content,
                image_url: imageUrl,
            };

            let result;
            if (editingId) {
                // We need to import updateProject, I'll add that below
                result = await updateProject(editingId, projectData);
            } else {
                result = await createProject(projectData);
            }

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(editingId ? "Project updated successfully!" : "Project created successfully!");
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
        if (!confirm("Are you sure you want to delete this project?")) return;

        setDeleteLoading(id);
        const result = await deleteProject(id);
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success("Project deleted successfully");
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
                        <Plus className="w-5 h-5" /> PASANG PROYEK BARU
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl bg-white border-4 border-foreground rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-[90vh] flex flex-col p-0 overflow-hidden">
                        <DialogHeader className="p-8 border-b-4 border-foreground bg-primary shrink-0 text-left">
                            <DialogTitle className="text-3xl font-black uppercase tracking-tighter">Konfigurasi Proyek</DialogTitle>
                            <DialogDescription className="text-foreground font-bold opacity-70">
                                Tambahkan atau perbarui karya portofolio publik RBAdev.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="overflow-y-auto flex-1 p-6">
                            <form id="project-form" onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-xs text-text-dim uppercase tracking-wider font-semibold">Title</Label>
                                    <Input id="title" required value={title} onChange={e => setTitle(e.target.value)} className="bg-background border-surface-border" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tech_stack" className="text-xs text-text-dim uppercase tracking-wider font-semibold">Tech Stack</Label>
                                    <Input id="tech_stack" placeholder="React, Node.js, Tailwind" value={techStack} onChange={e => setTechStack(e.target.value)} className="bg-background border-surface-border" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-xs text-text-dim uppercase tracking-wider font-semibold">Description</Label>
                                <Textarea id="description" required rows={3} value={description} onChange={e => setDescription(e.target.value)} className="bg-background border-surface-border resize-none" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="slug" className="text-xs text-text-dim uppercase tracking-wider font-semibold">Slug (Optional)</Label>
                                    <Input id="slug" placeholder="nama-project" value={slug} onChange={e => setSlug(e.target.value)} className="bg-background border-surface-border" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="live_link" className="text-xs text-text-dim uppercase tracking-wider font-semibold">Live URL</Label>
                                    <Input id="live_link" type="url" placeholder="https://" value={liveLink} onChange={e => setLiveLink(e.target.value)} className="bg-background border-surface-border" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="challenge" className="text-xs text-text-dim uppercase tracking-wider font-semibold">The Challenge</Label>
                                    <Textarea id="challenge" rows={3} value={challenge} onChange={e => setChallenge(e.target.value)} className="bg-background border-surface-border resize-none" placeholder="Apa masalah yang dihadapi klien?" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="solution" className="text-xs text-text-dim uppercase tracking-wider font-semibold">The Solution</Label>
                                    <Textarea id="solution" rows={3} value={solution} onChange={e => setSolution(e.target.value)} className="bg-background border-surface-border resize-none" placeholder="Bagaimana solusi dari tim?" />
                                </div>
                            </div>

                            <div className="space-y-6 pt-4 border-t-2 border-slate-100">
                                <Label htmlFor="image" className="text-xs font-black uppercase tracking-widest text-foreground">Thumbnail Cover / Visual Proyek</Label>
                                <div className="flex items-center gap-6 p-4 bg-slate-50 border-2 border-dashed border-slate-200">
                                    {currentImageUrl && !file && (
                                        <div className="relative w-20 h-20 border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0 overflow-hidden">
                                            <Image src={currentImageUrl} alt="Current project cover" fill className="object-cover" />
                                        </div>
                                    )}
                                    <Input id="image" type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="bg-white border-2 border-foreground cursor-pointer flex-1 font-bold file:bg-primary file:font-black file:uppercase file:text-[10px]" />
                                </div>
                            </div>
                        </form>
                        </div>

                        <DialogFooter className="p-8 border-t-4 border-foreground bg-surface shrink-0">
                            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="border-2 border-foreground bg-white hover:bg-muted font-bold uppercase text-xs tracking-widest px-6 h-12 rounded-none">
                                Batalkan
                            </Button>
                            <button type="submit" form="project-form" disabled={loading} className="brutalist-button h-12 flex items-center justify-center min-w-[160px]">
                                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "AKTIFKAN PROYEK"}
                            </button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="brutalist-card bg-white overflow-hidden">
                <Table className="border-collapse">
                    <TableHeader className="bg-foreground text-background border-b-4 border-foreground">
                        <TableRow className="hover:bg-transparent border-0 h-16">
                            <TableHead className="text-background font-black text-xs uppercase tracking-[0.2em] px-8">PROYEK / ENTITAS</TableHead>
                            <TableHead className="text-background font-black text-xs uppercase tracking-[0.2em] hidden md:table-cell">TEKNOLOGI</TableHead>
                            <TableHead className="text-background font-black text-xs uppercase tracking-[0.2em] w-[120px]">TAUTAN</TableHead>
                            <TableHead className="text-background font-black text-xs uppercase tracking-[0.2em] text-right w-[120px] px-8">KENDALI</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {initialProjects.length === 0 ? (
                            <TableRow className="hover:bg-transparent border-0">
                                <TableCell colSpan={4} className="h-32 text-center text-text-muted">
                                    No projects fully deployed yet. Click "Add Project" to launch one.
                                </TableCell>
                            </TableRow>
                        ) : (
                            initialProjects.map((project) => (
                                <TableRow key={project.id} className="border-b border-surface-border/50 hover:bg-surface/30 transition-colors">
                                    <TableCell className="font-medium text-foreground py-4">
                                        <div className="flex items-center gap-3">
                                            {project.image_url ? (
                                                <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-surface-border flex-shrink-0">
                                                    <Image src={project.image_url} alt={project.title} fill className="object-cover" />
                                                </div>
                                            ) : (
                                                <div className="w-10 h-10 rounded-lg bg-surface border border-surface-border flex items-center justify-center flex-shrink-0 inner-glow">
                                                    <FolderKanban className="w-4 h-4 text-text-dim" />
                                                </div>
                                            )}
                                            <div>
                                                {project.title}
                                                <p className="text-xs text-text-muted font-normal mt-0.5 line-clamp-1 max-w-[200px]">{project.description}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {project.tech_stack?.slice(0, 3).map((tech: string) => (
                                                <Badge key={tech} variant="secondary" className="bg-surface border border-surface-border text-text-dim text-[10px] px-1.5 font-medium hover:bg-surface-light">
                                                    {tech}
                                                </Badge>
                                            ))}
                                            {project.tech_stack?.length > 3 && (
                                                <Badge variant="secondary" className="bg-surface border border-surface-border text-text-dim text-[10px] px-1.5 hover:bg-surface-light">
                                                    +{project.tech_stack.length - 3}
                                                </Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div className="flex items-center gap-2">
                                            {project.live_link && (
                                                <a href={project.live_link} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg border border-surface-border bg-surface flex items-center justify-center text-text-dim hover:text-foreground hover:bg-surface-light transition-colors" title="Live Link">
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right py-6 px-8">
                                        <div className="flex items-center justify-end gap-3">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEdit(project)}
                                                className="border-2 border-foreground bg-white hover:bg-secondary hover:text-white h-10 w-10 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(project.id)}
                                                disabled={deleteLoading === project.id}
                                                className="border-2 border-foreground bg-white hover:bg-destructive hover:text-white h-10 w-10 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                                            >
                                                {deleteLoading === project.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
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
