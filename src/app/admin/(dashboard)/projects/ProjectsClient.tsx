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
import { createProject, deleteProject, uploadImage } from "@/lib/actions/project";
import Image from "next/image";

export default function ProjectsClient({ initialProjects }: { initialProjects: any[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

    // Form stats
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [techStack, setTechStack] = useState("");
    const [liveLink, setLiveLink] = useState("");
    const [githubLink, setGithubLink] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setTechStack("");
        setLiveLink("");
        setGithubLink("");
        setFile(null);
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
            let imageUrl = "";

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

            const result = await createProject({
                title,
                description,
                tech_stack: techStackArray,
                live_link: liveLink,
                github_link: githubLink,
                image_url: imageUrl,
            });

            if (result.error) {
                toast.error("Failed to create project: " + result.error);
            } else {
                toast.success("Project created successfully!");
                setIsOpen(false);
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
                    <DialogContent className="max-w-2xl bg-surface border-surface-border rounded-xl shadow-lg">
                        <DialogHeader>
                            <DialogTitle>Deploy New Project</DialogTitle>
                            <DialogDescription className="text-text-muted">
                                Add a new project to your public portfolio showcase.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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
                                    <Label htmlFor="live_link" className="text-xs text-text-dim uppercase tracking-wider font-semibold">Live URL</Label>
                                    <Input id="live_link" type="url" placeholder="https://" value={liveLink} onChange={e => setLiveLink(e.target.value)} className="bg-background border-surface-border" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="github_link" className="text-xs text-text-dim uppercase tracking-wider font-semibold">GitHub URL</Label>
                                    <Input id="github_link" type="url" placeholder="https://" value={githubLink} onChange={e => setGithubLink(e.target.value)} className="bg-background border-surface-border" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="image" className="text-xs text-text-dim uppercase tracking-wider font-semibold">Thumbnail Cover</Label>
                                <Input id="image" type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="bg-background border-surface-border cursor-pointer" />
                            </div>

                            <DialogFooter className="mt-6 border-t border-surface-border pt-4">
                                <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="border-surface-border bg-surface hover:bg-surface-light hover:text-foreground">
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={loading} className="bg-foreground text-background hover:bg-foreground/90">
                                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                    Deploy Project
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
                                            {project.github_link && (
                                                <a href={project.github_link} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg border border-surface-border bg-surface flex items-center justify-center text-text-dim hover:text-foreground hover:bg-surface-light transition-colors" title="Source Code">
                                                    <Github className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right py-4">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(project.id)}
                                            disabled={deleteLoading === project.id}
                                            className="text-text-dim hover:text-error hover:bg-error/10 h-8 w-8 rounded-lg"
                                        >
                                            {deleteLoading === project.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
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
