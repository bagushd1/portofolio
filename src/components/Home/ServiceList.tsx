import { getPublicServices } from "@/lib/api/portfolio";
import ScrollReveal from "@/components/ScrollReveal";
import { Laptop, Layout, Database, Globe, Server, Code2, Smartphone, CheckCircle2, LucideIcon, ChevronRight } from "lucide-react";

// Map string icon names to Lucide components
const IconMap: Record<string, LucideIcon> = {
    Laptop,
    Layout,
    Database,
    Globe,
    Server,
    Code2,
    Smartphone,
    CheckCircle2,
};

export default async function ServiceList() {
    const services = await getPublicServices();

    if (!services || services.length === 0) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 h-full">
            {/* SERVICE TILES */}
            {services.map((service, index) => {
                const IconComponent = (service.icon && IconMap[service.icon]) || Laptop;
                // Rotating color palette for bento feel
                const colors = [
                    { bg: "bg-white", text: "text-foreground", accent: "bg-primary" },
                    { bg: "bg-secondary", text: "text-white", accent: "bg-white" },
                ];
                const theme = colors[index % colors.length];

                return (
                    <ScrollReveal
                        key={service.id}
                        delay={0.1 + (index * 0.05)}
                        className={`${theme.bg} ${theme.text} border-4 border-foreground rounded-[2rem] p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex flex-col items-start min-h-[280px] group`}
                    >
                        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${theme.accent} border-2 border-foreground flex items-center justify-center mb-10 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:scale-110 transition-transform`}>
                            <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-foreground" />
                        </div>
                        
                        <div className="mt-auto">
                            <h3 className="text-xl md:text-2xl font-black mb-3 uppercase tracking-tighter leading-none">
                                {service.title}
                            </h3>
                            <p className="font-bold text-xs md:text-sm leading-relaxed opacity-70 uppercase tracking-tight">
                                {service.description}
                            </p>
                        </div>
                    </ScrollReveal>
                );
            })}
        </div>
    );
}

export function ServiceSkeleton() {
    return (
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-foreground/5 animate-pulse rounded-[2rem] border-4 border-foreground/10" />
            ))}
        </div>
    );
}
