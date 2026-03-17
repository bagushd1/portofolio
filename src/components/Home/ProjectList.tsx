import { getPublicProjects } from "@/lib/api/portfolio";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import Image from "next/image";
import { Laptop, ArrowRight, Code2 } from "lucide-react";

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
        <div className="flex flex-col gap-32 md:gap-48">
            {projects.map((project, index) => {
                const isEven = index % 2 === 0;
                
                return (
                    <div key={project.id} className="relative">
                        {/* Horizontal Divider between items */}
                        {index > 0 && (
                            <div className="absolute -top-16 md:-top-24 left-0 right-0 h-px bg-foreground/10"></div>
                        )}
                        
                        <ScrollReveal 
                            delay={0.1} 
                            className={`group relative flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 md:gap-24`}
                        >
                            {/* Background Giant Index */}
                            <div className={`absolute -top-24 opacity-[0.02] text-[18rem] md:text-[30rem] font-black pointer-events-none select-none ${isEven ? '-left-12' : '-right-12'}`}>
                                {(index + 1).toString().padStart(2, '0')}
                            </div>

                            {/* Project Image Strip */}
                            <Link 
                                href={`/work/${project.slug || project.id}`} 
                                className="w-full lg:w-3/5 aspect-video md:aspect-[16/9] relative overflow-hidden border-4 border-foreground rounded-[2.5rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-500 bg-secondary"
                            >
                                {project.image_url ? (
                                    <Image 
                                        src={project.image_url} 
                                        alt={project.title} 
                                        fill 
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Laptop className="w-20 h-20 opacity-20" />
                                    </div>
                                )}
                            </Link>

                            {/* Project Info Strip */}
                            <div className={`w-full lg:w-2/5 flex flex-col ${isEven ? 'items-start text-left' : 'items-end text-right'} relative z-10`}>
                                <div className={`flex items-center gap-4 mb-8 ${!isEven && 'flex-row-reverse'}`}>
                                    <div className="h-0.5 w-12 bg-primary"></div>
                                    <span className="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-foreground/40">
                                        Est. {new Date(project.created_at).getFullYear()}
                                    </span>
                                </div>

                                <Link href={`/work/${project.slug || project.id}`}>
                                    <h3 className="text-4xl md:text-7xl font-black mb-8 uppercase tracking-tighter leading-[0.85] hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                </Link>

                                <p className="font-bold text-base md:text-xl leading-relaxed text-foreground/50 mb-12 max-w-lg italic font-serif">
                                    {project.description}
                                </p>

                                <div className={`flex flex-wrap gap-2 mb-12 ${!isEven && 'justify-end'}`}>
                                    {project.tech_stack?.slice(0, 5).map((tech: string) => (
                                        <span key={tech} className="px-5 py-2 bg-white border-2 border-foreground text-[10px] md:text-xs font-black uppercase tracking-widest rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                            {tech.trim()}
                                        </span>
                                    ))}
                                </div>

                                <Link 
                                    href={`/work/${project.slug || project.id}`} 
                                    className="inline-flex items-center gap-4 px-10 py-5 bg-primary border-4 border-foreground text-foreground font-black uppercase tracking-widest text-xs md:text-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                                >
                                    Explore Case Study <ArrowRight className="w-6 h-6" />
                                </Link>
                            </div>
                        </ScrollReveal>
                    </div>
                );
            })}
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
