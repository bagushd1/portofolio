import { getProjectBySlug, getPublicProjects } from "@/lib/api/portfolio";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import { ArrowLeft, ExternalLink, Laptop, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectGallery from "@/components/Project/ProjectGallery";

export const revalidate = 60;

export async function generateStaticParams() {
    const projects = await getPublicProjects();
    return projects.map((project) => ({
        slug: project.slug || project.id,
    }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="pt-32 pb-24 px-4 sm:px-6 md:px-12">
                <div className="max-w-[1000px] mx-auto">
                    {/* Back Button */}
                    <Link href="/#work" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-foreground hover:text-primary mb-12 group transition-colors">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Kembali ke Katalog
                    </Link>

                    {/* Hero Header */}
                    <div className="mb-12 md:mb-20">
                        <ScrollReveal delay={0.1}>
                            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
                                {project.title}
                            </h1>
                        </ScrollReveal>

                        <ScrollReveal delay={0.2} className="flex flex-wrap gap-3">
                            {project.tech_stack.map((tech) => (
                                <span key={tech} className="px-4 py-2 bg-foreground text-background text-xs font-black uppercase tracking-widest border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]">
                                    {tech}
                                </span>
                            ))}
                        </ScrollReveal>
                    </div>

                    {/* Hero Image */}
                    <ScrollReveal delay={0.3} className="relative aspect-[16/9] w-full rounded-[1.5rem] md:rounded-[3rem] overflow-hidden border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-16 md:mb-24">
                        {project.image_url ? (
                            <Image src={project.image_url} alt={project.title} fill className="object-cover" />
                        ) : (
                            <div className="absolute inset-0 bg-secondary flex items-center justify-center">
                                <Laptop className="w-24 h-24 text-foreground opacity-20" />
                            </div>
                        )}
                    </ScrollReveal>

                    {/* Bento Grid Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 md:mb-24">
                        {/* Challenge Box */}
                        <ScrollReveal delay={0.4} direction="right" className="bg-primary border-4 border-foreground rounded-[2rem] p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <h2 className="text-3xl font-black uppercase tracking-tight mb-6">The Challenge</h2>
                            <p className="text-lg font-bold leading-relaxed text-foreground/80">
                                {project.challenge || "Detail tantangan belum ditambahkan oleh admin."}
                            </p>
                        </ScrollReveal>

                        {/* Solution Box */}
                        <ScrollReveal delay={0.5} direction="left" className="bg-[#bbf7d0] border-4 border-foreground rounded-[2rem] p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <h2 className="text-3xl font-black uppercase tracking-tight mb-6">The Solution</h2>
                            <p className="text-lg font-bold leading-relaxed text-foreground/80">
                                {project.solution || "Detail solusi belum ditambahkan oleh admin."}
                            </p>
                        </ScrollReveal>
                    </div>

                    {/* Main Content / Case Study Details */}
                    <ScrollReveal delay={0.6} className="prose prose-xl prose-invert max-w-none text-foreground font-medium leading-relaxed mb-24">
                        <h2 className="text-4xl font-black uppercase tracking-tight mb-12 border-b-8 border-secondary inline-block">Deep Dive & Analysis</h2>
                        <div className="whitespace-pre-wrap">
                            {project.content || "Tuliskan detail pengerjaan, arsitektur, dan dampak sistem di sini melalui admin panel."}
                        </div>
                    </ScrollReveal>

                    {/* Project Gallery Showcase */}
                    {project.gallery_urls && project.gallery_urls.length > 0 && (
                        <ProjectGallery images={project.gallery_urls} />
                    )}

                    {/* CTA / Results */}
                    <ScrollReveal delay={0.7} className="bg-foreground text-background rounded-[2rem] p-8 md:p-16 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(187,247,208,1)] text-center">
                        <CheckCircle2 className="w-16 h-16 text-[#bbf7d0] mx-auto mb-8" />
                        <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">Project Successfully Delivered</h3>
                        <p className="text-xl font-bold mb-10 text-background/80 max-w-2xl mx-auto">
                            Ingin mendeploy solusi serupa untuk bisnis atau instansi Anda? Mari berdiskusi tentang potensi kolaborasi kita.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/#contact" className="px-8 py-4 bg-[#bbf7d0] text-foreground font-black uppercase tracking-widest border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                                Hubungi Tim Kami
                            </Link>
                            {project.live_link && (
                                <a href={project.live_link} target="_blank" rel="noreferrer" className="px-8 py-4 bg-background text-foreground font-black uppercase tracking-widest border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2">
                                    Launch Site <ExternalLink className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    </ScrollReveal>
                </div>
            </main>
        </div>
    );
}
