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
                        render={<Button className="bg-foreground text-background hover:bg-foreground/90 font-medium h-10 px-4 rounded-xl" />}
                    >
                        <Plus className="w-4 h-4 mr-2" /> Add Project
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl bg-surface border-surface-border rounded-xl shadow-lg h-[90vh] flex flex-col p-0 overflow-hidden">
                        <DialogHeader className="p-6 border-b border-surface-border bg-surface shrink-0">
                            <DialogTitle>{editingId ? "Edit Project" : "Deploy New Project"}</DialogTitle>
                            <DialogDescription className="text-text-muted">
                                Add or edit a project in your public portfolio showcase.
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

                            <div className="space-y-2">
                                <Label htmlFor="content" className="text-xs text-text-dim uppercase tracking-wider font-semibold">Full Case Study Content (Markdown)</Label>
                                <Textarea id="content" rows={5} value={content} onChange={e => setContent(e.target.value)} className="bg-background border-surface-border resize-none" placeholder="Tulis detail pengerjaan di sini..." />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="image" className="text-xs text-text-dim uppercase tracking-wider font-semibold">Thumbnail Cover</Label>
                                <div className="flex items-center gap-4">
                                    {currentImageUrl && !file && (
                                        <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-surface-border flex-shrink-0">
                                            <Image src={currentImageUrl} alt="Current project cover" fill className="object-cover" />
                                        </div>
                                    )}
                                    <Input id="image" type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="bg-background border-surface-border cursor-pointer flex-1" />
                                </div>
                            </div>
                        </form>
                        </div>

                        <DialogFooter className="p-6 border-t border-surface-border bg-surface shrink-0">
                            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="border-surface-border bg-surface hover:bg-surface-light hover:text-foreground">
                                Cancel
                            </Button>
                            <Button type="submit" form="project-form" disabled={loading} className="bg-foreground text-background hover:bg-foreground/90">
                                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                {editingId ? "Save Changes" : "Deploy Project"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="border border-surface-border rounded-xl overflow-hidden bg-surface shadow-sm">
                <Table>
                    <TableHeader className="bg-surface border-b border-surface-border">
                        <TableRow className="hover:bg-transparent border-0">
                            <TableHead className="text-text-muted font-semibold h-12 text-xs uppercase tracking-wider">Project</TableHead>
                            <TableHead className="text-text-muted font-semibold h-12 text-xs uppercase tracking-wider hidden md:table-cell">Stack</TableHead>
                            <TableHead className="text-text-muted font-semibold h-12 text-xs uppercase tracking-wider w-[120px]">Links</TableHead>
                            <TableHead className="text-text-muted font-semibold h-12 text-xs uppercase tracking-wider text-right w-[80px]">Actions</TableHead>
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
                                    <TableCell className="text-right py-4">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEdit(project)}
                                                className="text-text-dim hover:text-foreground hover:bg-surface-light h-8 w-8 rounded-lg"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(project.id)}
                                                disabled={deleteLoading === project.id}
                                                className="text-text-dim hover:text-error hover:bg-error/10 h-8 w-8 rounded-lg"
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
