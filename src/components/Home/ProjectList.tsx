import { getPublicProjects } from "@/lib/api/portfolio";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import Image from "next/image";
import { Laptop } from "lucide-react";

export default async function ProjectList() {
    const projects = await getPublicProjects();

    if (!projects || projects.length === 0) {
        return (
            <div className="col-span-1 md:col-span-2 py-24 md:py-32 text-center border-2 md:border-4 border-foreground rounded-[1.5rem] md:rounded-[2.5rem] bg-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-xl md:text-2xl font-black uppercase tracking-widest text-foreground">KOSONG.</p>
                <p className="text-base md:text-lg font-bold text-muted-foreground mt-4 px-4">Belum ada proyek yang diterbitkan admin.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {projects.map((project, index) => (
                <ScrollReveal delay={index * 0.1} key={project.id} className="group relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border-2 md:border-4 border-foreground bg-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 md:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col">
                    <Link href={`/work/${project.slug || project.id}`} className="block aspect-[4/3] bg-muted relative overflow-hidden border-b-2 md:border-b-4 border-foreground">
                        {project.image_url ? (
                            <Image src={project.image_url} alt={project.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-secondary">
                                <Laptop className="w-12 h-12 md:w-16 md:h-16 text-foreground opacity-30" />
                            </div>
                        )}

                        <div className="absolute top-4 left-4 bg-[#fff133] border-2 md:border-4 border-foreground px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            {new Date(project.created_at).getFullYear()}
                        </div>

                        <div className="absolute bottom-4 right-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10 flex gap-2">
                            {project.live_link && (
                                <div className="inline-flex h-10 md:h-12 items-center justify-center bg-[#bbf7d0] px-4 md:px-6 text-xs md:text-sm font-black uppercase text-foreground border-2 md:border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#fff133] transition-colors">
                                    Demo Live
                                </div>
                            )}
                            <div className="inline-flex h-10 md:h-12 items-center justify-center bg-foreground px-4 md:px-6 text-xs md:text-sm font-black uppercase text-background border-2 md:border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-primary transition-colors">
                                Lihat Detail
                            </div>
                        </div>
                    </Link>
                    <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                        <div>
                            <Link href={`/work/${project.slug || project.id}`}>
                                <h3 className="text-2xl md:text-3xl font-black mb-2 md:mb-3 text-foreground uppercase leading-tight hover:text-primary transition-colors">{project.title}</h3>
                            </Link>
                            <p className="text-foreground font-bold mb-6 md:mb-8 line-clamp-3 leading-relaxed text-sm md:text-base">
                                {project.description}
                            </p>
                        </div>
                        {project.tech_stack && project.tech_stack.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-4 md:pt-6 border-t-2 md:border-t-4 border-foreground">
                                {project.tech_stack.map((tech: string) => (
                                    <span key={tech} className="px-3 md:px-4 py-1 md:py-2 bg-secondary text-foreground text-[10px] md:text-xs font-black uppercase tracking-wider rounded-full border-2 md:border-4 border-foreground">
                                        {tech.trim()}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </ScrollReveal>
            ))}
        </div>
    );
}

export function ProjectSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[1, 2].map((i) => (
                <div key={i} className="h-[400px] bg-foreground/5 animate-pulse rounded-[2rem] border-4 border-foreground/10" />
            ))}
        </div>
    );
}
