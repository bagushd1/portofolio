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
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 text-left">
            {services.map((service, index) => {
                const IconComponent = (service.icon && IconMap[service.icon]) || Laptop;
                const bgColors = ["bg-[#bbf7d0]", "bg-[#fef08a]", "bg-[#ff4a4a]"];
                const isRed = bgColors[index % bgColors.length] === "bg-[#ff4a4a]";

                return (
                    <ScrollReveal
                        key={service.id}
                        delay={index * 0.1}
                        className={`${bgColors[index % bgColors.length]} ${isRed ? 'text-white' : 'text-foreground'} rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 md:p-10 border-2 md:border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-transform duration-300`}
                    >
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-background border-2 md:border-4 border-foreground flex items-center justify-center mb-6 md:mb-8 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-foreground" />
                        </div>
                        <h3 className={`text-2xl md:text-3xl font-black mb-3 md:mb-4 uppercase ${isRed ? 'text-white' : 'text-foreground'}`}>
                            {service.title}
                        </h3>
                        <p className={`${isRed ? 'text-white' : 'text-foreground'} font-bold text-base md:text-lg leading-relaxed`}>
                            {service.description}
                        </p>
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
