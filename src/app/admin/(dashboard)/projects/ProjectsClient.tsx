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
import { Plus, Pencil, Trash2, ExternalLink, Github, Loader2, FolderKanban, X, ImageIcon } from "lucide-react";
import { createProject, updateProject, deleteProject, uploadImage } from "@/lib/actions/project";
import Image from "next/image";

export default function ProjectsClient({ initialProjects }: { initialProjects: any[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [currentImageUrl, setCurrentImageUrl] = useState("");
    const [galleryUrls, setGalleryUrls] = useState<string[]>([]);

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
        setGalleryUrls([]);
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
        setGalleryUrls(project.gallery_urls || []);
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
                gallery_urls: galleryUrls,
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

    const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        setLoading(true);
        const newUrls: string[] = [];

        try {
            for (const file of files) {
                const formData = new FormData();
                formData.append("file", file);
                const uploadResult = await uploadImage(formData);

                if (uploadResult.error || !uploadResult.success) {
                    toast.error(`Failed to upload ${file.name}: ${uploadResult.error}`);
                    continue;
                }
                newUrls.push(uploadResult.url as string);
            }
            setGalleryUrls(prev => [...prev, ...newUrls]);
            toast.success(`${newUrls.length} image(s) uploaded to gallery`);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const removeGalleryImage = (index: number) => {
        setGalleryUrls(prev => prev.filter((_, i) => i !== index));
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
                        render={<button className="brutalist-button flex items-center gap-2 h-12 transform hover:-translate-x-1 hover:-translate-y-1 bg-primary text-foreground" />}
                    >
                        <Plus className="w-5 h-5 text-foreground" /> PASANG PROYEK BARU
                    </DialogTrigger>
                    <DialogContent className="max-w-7xl bg-white border-4 border-foreground rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] h-[95vh] flex flex-col p-0 overflow-hidden">
                        <DialogHeader className="p-8 border-b-4 border-foreground bg-primary shrink-0 text-left">
                            <DialogTitle className="text-4xl font-black uppercase tracking-tighter text-foreground leading-[0.9]">Konfigurasi Proyek</DialogTitle>
                            <DialogDescription className="text-foreground font-bold opacity-80 italic text-sm mt-1">
                                Detail teknis dan solusi strategis untuk portofolio publik RBAdev.
                            </DialogDescription>
                        </DialogHeader>
                        
                        <div className="overflow-y-auto flex-1 p-8 bg-white">
                            <form id="project-form" onSubmit={handleSubmit} className="space-y-10">
                                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                                    <div className="xl:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-5">
                                            <div className="space-y-2">
                                                <Label htmlFor="title" className="text-xs text-foreground uppercase tracking-[0.2em] font-black">Judul Proyek Utama</Label>
                                                <Input id="title" required value={title} onChange={e => setTitle(e.target.value)} className="brutalist-input h-12 text-base font-bold" placeholder="E.g. Nexus Dashboard v2" />
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="slug" className="text-xs text-foreground uppercase tracking-[0.2em] font-black">Slug URL Path</Label>
                                                    <Input id="slug" placeholder="nexus-dashboard" value={slug} onChange={e => setSlug(e.target.value)} className="brutalist-input h-12 text-sm" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="live_link" className="text-xs text-foreground uppercase tracking-[0.2em] font-black">External Live Link</Label>
                                                    <Input id="live_link" type="url" placeholder="https://..." value={liveLink} onChange={e => setLiveLink(e.target.value)} className="brutalist-input h-12 text-sm" />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="tech_stack" className="text-xs text-foreground uppercase tracking-[0.2em] font-black">Stack Teknologi</Label>
                                                <Input id="tech_stack" placeholder="Next.js, Tailwind, Supabase" value={techStack} onChange={e => setTechStack(e.target.value)} className="brutalist-input h-12 text-sm" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="description" className="text-xs text-foreground uppercase tracking-[0.2em] font-black">Ringkasan Eksekutif</Label>
                                            <Textarea id="description" required rows={6} value={description} onChange={e => setDescription(e.target.value)} className="bg-white border-2 border-foreground font-medium resize-none p-5 h-full min-h-[160px] rounded-[2rem] focus-visible:ring-0 focus-visible:border-primary transition-all shadow-inner text-base leading-relaxed" placeholder="Jelaskan kontribusi proyek ini..." />
                                        </div>
                                    </div>

                                    <div className="xl:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t-2 border-slate-100">
                                        <div className="space-y-3">
                                            <Label htmlFor="challenge" className="text-xs text-foreground uppercase tracking-[0.2em] font-black">Tantangan (The Challenge)</Label>
                                            <Textarea id="challenge" rows={5} value={challenge} onChange={e => setChallenge(e.target.value)} className="bg-slate-50 border-2 border-foreground font-medium resize-none p-5 rounded-2xl text-sm leading-relaxed" placeholder="Apa kompleksitas teknisnya?" />
                                        </div>
                                        <div className="space-y-3">
                                            <Label htmlFor="solution" className="text-xs text-foreground uppercase tracking-[0.2em] font-black">Solusi (The Solution)</Label>
                                            <Textarea id="solution" rows={5} value={solution} onChange={e => setSolution(e.target.value)} className="bg-slate-50 border-2 border-foreground font-medium resize-none p-5 rounded-2xl text-sm leading-relaxed" placeholder="Bagaimana rekayasa sistemnya?" />
                                        </div>
                                    </div>

                                    <div className="xl:col-span-12 space-y-8 pt-8 border-t-2 border-slate-100">
                                        <div className="text-center">
                                            <Label className="text-xs text-foreground uppercase tracking-[0.2em] font-black block mb-4">Aset Visual Utama (Cover)</Label>
                                            <div className="flex flex-col items-center justify-center p-6 bg-slate-50 border-4 border-dashed border-foreground/10 rounded-[2rem]">
                                                {currentImageUrl && !file && (
                                                    <div className="relative w-48 aspect-video border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex-shrink-0 mb-4 rounded-2xl overflow-hidden">
                                                        <Image src={currentImageUrl} alt="Current project cover" fill className="object-cover" />
                                                    </div>
                                                )}
                                                <div className="w-full max-w-lg space-y-2">
                                                    <Input id="image" type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="brutalist-input file:bg-primary file:font-black file:uppercase file:text-[10px] file:h-full file:border-0 file:border-r-2 file:border-foreground file:mr-4 file:px-6 h-12 flex items-center" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <Label className="text-xs text-foreground uppercase tracking-[0.2em] font-black block text-center">Project Gallery (Portfolio Assets)</Label>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 bg-slate-50 border-4 border-dashed border-foreground/10 rounded-[2rem]">
                                                {galleryUrls.map((url, index) => (
                                                    <div key={index} className="relative aspect-square border-2 border-foreground rounded-xl overflow-hidden group shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                        <Image src={url} alt={`Gallery image ${index + 1}`} fill className="object-cover" />
                                                        <button 
                                                            onClick={() => removeGalleryImage(index)}
                                                            type="button"
                                                            className="absolute top-1 right-1 bg-destructive text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                ))}
                                                <label className="relative aspect-square border-2 border-dashed border-foreground/30 rounded-xl cursor-copy hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-2 group">
                                                    <ImageIcon className="w-6 h-6 text-foreground/30 group-hover:text-primary" />
                                                    <span className="text-[10px] font-black uppercase text-foreground/30 group-hover:text-primary">Unggah Baru</span>
                                                    <input 
                                                        type="file" 
                                                        multiple 
                                                        accept="image/*" 
                                                        className="hidden" 
                                                        onChange={handleGalleryUpload}
                                                        disabled={loading}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <DialogFooter className="p-8 border-t-4 border-foreground bg-slate-50 shrink-0">
                            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="border-4 border-foreground bg-white hover:bg-muted font-black uppercase text-[10px] tracking-widest px-8 h-12 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all hover:shadow-none">
                                Batalkan
                            </Button>
                            <button type="submit" form="project-form" disabled={loading} className="brutalist-button h-12 flex items-center justify-center min-w-[200px] text-[10px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                {loading ? <Loader2 className="w-5 h-5 mr-3 animate-spin" /> : "SIMPAN KONFIGURASI"}
                            </button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="brutalist-card bg-white overflow-hidden">
                <Table className="border-collapse">
                    <TableHeader className="bg-foreground text-background border-b-4 border-foreground">
                        <TableRow className="hover:bg-transparent border-0 h-16">
                            <TableHead className="text-background font-black text-xs uppercase tracking-[0.2em] px-8 first:rounded-tl-[1.75rem]">PROYEK / ENTITAS</TableHead>
                            <TableHead className="text-background font-black text-xs uppercase tracking-[0.2em] hidden md:table-cell">TEKNOLOGI</TableHead>
                            <TableHead className="text-background font-black text-xs uppercase tracking-[0.2em] w-[120px]">TAUTAN</TableHead>
                            <TableHead className="text-background font-black text-xs uppercase tracking-[0.2em] text-right w-[120px] px-8 last:rounded-tr-[1.75rem]">KENDALI</TableHead>
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
                                                className="border-2 border-foreground bg-white hover:bg-secondary hover:text-white h-10 w-10 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(project.id)}
                                                disabled={deleteLoading === project.id}
                                                className="border-2 border-foreground bg-white hover:bg-destructive hover:text-white h-10 w-10 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
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
