import { getPublicProjects } from "@/lib/api/portfolio";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import { ArrowRight, Laptop, ExternalLink, Code2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

export default async function PortfolioPage() {
    const projects = await getPublicProjects();

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="pt-32 pb-24 px-4 sm:px-6 md:px-12">
                <div className="max-w-[1400px] mx-auto">
                    <header className="mb-16 md:mb-24">
                        <ScrollReveal delay={0.1}>
                            <h1 className="text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
                                Selected <br />
                                <span className="text-primary italic font-serif lowercase">Works.</span>
                            </h1>
                        </ScrollReveal>
                        <ScrollReveal delay={0.2} className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <p className="text-lg md:text-2xl font-bold text-text-muted max-w-2xl uppercase tracking-wide">
                                Etalase solusi digital yang telah kami bangun. Dari arsitektur sistem yang kompleks hingga antarmuka pengguna yang memukau.
                            </p>
                            <div className="flex items-center gap-4 text-sm font-black uppercase tracking-widest">
                                <span className="w-12 h-1 bg-foreground"></span>
                                Total {projects.length} Projects
                            </div>
                        </ScrollReveal>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                        {projects.map((project, index) => (
                            <ScrollReveal key={project.id} delay={index * 0.1} direction={index % 2 === 0 ? "left" : "right"}>
                                <div className="group relative">
                                    {/* Project Image Wrapper */}
                                    <Link href={`/work/${project.slug || project.id}`} className="block relative aspect-[16/10] overflow-hidden border-4 border-foreground rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all transform group-hover:-translate-y-2">
                                        {project.image_url ? (
                                            <Image
                                                src={project.image_url}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-secondary flex items-center justify-center">
                                                <Laptop className="w-20 h-20 text-foreground opacity-20" />
                                            </div>
                                        )}

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-12 text-center">
                                            <p className="text-foreground font-black uppercase tracking-[0.2em] mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform">View Case Study</p>
                                            <div className="w-16 h-16 bg-background rounded-full border-4 border-foreground flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform delay-75">
                                                <ArrowRight className="w-8 h-8 text-foreground" />
                                            </div>
                                        </div>
                                    </Link>

                                    {/* Project Info */}
                                    <div className="mt-8 flex flex-col md:flex-row md:items-start justify-between gap-6">
                                        <div className="flex-1">
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {project.tech_stack.slice(0, 3).map(tech => (
                                                    <span key={tech} className="px-3 py-1 bg-foreground text-background text-[10px] font-black uppercase tracking-widest border-2 border-foreground">
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.tech_stack.length > 3 && (
                                                    <span className="px-3 py-1 border-2 border-foreground text-[10px] font-black uppercase tracking-widest bg-background">
                                                        +{project.tech_stack.length - 3} More
                                                    </span>
                                                )}
                                            </div>
                                            <Link href={`/work/${project.slug || project.id}`}>
                                                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter hover:text-primary transition-colors mb-4">
                                                    {project.title}
                                                </h2>
                                            </Link>
                                            <p className="text-text-muted font-bold text-lg line-clamp-2">
                                                {project.description}
                                            </p>
                                        </div>

                                        <div className="flex gap-4">
                                            {project.live_link && (
                                                <a
                                                    href={project.live_link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="w-12 h-12 bg-background border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center hover:bg-primary hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                                                    title="Visit Live Site"
                                                >
                                                    <ExternalLink className="w-5 h-5" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* Footer CTA */}
                    <ScrollReveal delay={0.5} className="mt-32 p-12 md:p-20 bg-foreground text-background rounded-[3rem] text-center border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(187,247,208,1)]">
                        <Code2 className="w-16 h-16 text-primary mx-auto mb-8" />
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-tight">
                            Punya Ide Proyek <br /> <span className="text-primary italic font-serif lowercase">Menantang?</span>
                        </h2>
                        <p className="text-xl md:text-2xl font-bold mb-12 text-background/80 max-w-2xl mx-auto">
                            Mari berkolaborasi membangun solusi digital yang tangguh, cepat, dan berdampak nyata bagi bisnis Anda.
                        </p>
                        <Link href="/#contact" className="inline-flex items-center gap-4 px-10 py-5 bg-primary text-foreground font-black uppercase tracking-widest border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all">
                            Diskusikan Proyek <ArrowRight className="w-6 h-6" />
                        </Link>
                    </ScrollReveal>
                </div>
            </main>
        </div>
    );
}
