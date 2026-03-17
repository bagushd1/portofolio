import { getPartners } from "@/lib/actions/partner";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import { Handshake, Globe, ArrowRight, MessageSquareQuote } from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

export const revalidate = 60;

export default async function PartnersPage() {
    const { data: partners = [] } = await getPartners();

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="pt-32 pb-24 px-4 sm:px-6 md:px-12">
                <div className="max-w-[1400px] mx-auto">
                    {/* Hero Header */}
                    <header className="mb-16 md:mb-24">
                        <ScrollReveal delay={0.1}>
                            <h1 className="text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
                                Trusted <br />
                                <span className="text-primary italic font-serif lowercase">Visionaries.</span>
                            </h1>
                        </ScrollReveal>
                        <ScrollReveal delay={0.2} className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <p className="text-lg md:text-2xl font-bold text-text-muted max-w-2xl uppercase tracking-wide border-l-8 border-primary pl-6">
                                Kami percaya pada kekuatan kolaborasi. Berikut adalah institusi dan brand yang telah mempercayakan transformasi digitalnya kepada RBAdev.
                            </p>
                            <div className="flex items-center gap-4 text-sm font-black uppercase tracking-widest bg-foreground text-background px-6 py-3 shadow-[6px_6px_0px_0px_rgba(187,247,208,1)]">
                                <Handshake className="w-5 h-5" />
                                {partners.length} Strategic Partners
                            </div>
                        </ScrollReveal>
                    </header>

                    {/* Partners Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8">
                        {partners.length === 0 ? (
                            <div className="lg:col-span-12 p-20 text-center border-4 border-dashed border-foreground/10 rounded-[3rem]">
                                <p className="text-2xl font-bold italic opacity-20 uppercase tracking-widest">No partners registered yet.</p>
                            </div>
                        ) : (
                            partners.map((partner, index) => {
                                // Simple logic for bento grid variety
                                const isWide = index % 3 === 0;
                                return (
                                    <ScrollReveal 
                                        key={partner.id} 
                                        delay={index * 0.1} 
                                        className={`${isWide ? "lg:col-span-8" : "lg:col-span-4"} group`}
                                    >
                                        <div className="h-full bg-white border-4 border-foreground rounded-[2rem] p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all transform hover:-translate-y-2 flex flex-col justify-between overflow-hidden relative">
                                            {/* Decorative Background Icon */}
                                            <div className="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                                                <Handshake size={280} />
                                            </div>

                                            <div>
                                                <div className="flex items-center justify-between mb-8 md:mb-12">
                                                    <div className="w-20 h-20 md:w-28 md:h-28 relative bg-slate-50 border-2 border-foreground rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110">
                                                        {partner.logo_url ? (
                                                            <Image 
                                                                src={partner.logo_url} 
                                                                alt={partner.name} 
                                                                fill 
                                                                className="object-contain p-4"
                                                            />
                                                        ) : (
                                                            <Globe className="w-10 h-10 text-foreground opacity-20" />
                                                        )}
                                                    </div>
                                                    
                                                    {partner.website_url && (
                                                        <a 
                                                            href={partner.website_url} 
                                                            target="_blank" 
                                                            className="w-14 h-14 bg-primary border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center hover:bg-secondary hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                                                        >
                                                            <ArrowRight className="w-6 h-6" />
                                                        </a>
                                                    )}
                                                </div>

                                                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 relative">
                                                    {partner.name}
                                                </h2>

                                                {partner.description && (
                                                    <div className="prose prose-slate prose-invert max-w-none text-foreground/70 font-bold text-lg leading-relaxed relative z-10">
                                                        <ReactMarkdown>{partner.description}</ReactMarkdown>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Footer Tag */}
                                            <div className="mt-12 flex items-center gap-3">
                                                <div className="h-2 w-12 bg-primary"></div>
                                                <span className="text-[10px] font-black uppercase tracking-widest opacity-40 italic">Strategic Collaboration</span>
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                );
                            })
                        )}
                    </div>

                    {/* CTA Footer */}
                    <ScrollReveal delay={0.5} className="mt-32 p-12 md:p-24 bg-primary text-foreground rounded-[3rem] text-center border-4 border-foreground shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8">
                            <MessageSquareQuote size={120} className="opacity-10" />
                        </div>
                        <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
                            Scale Your <br /> <span className="text-background italic font-serif lowercase">Business</span> Through Tech.
                        </h2>
                        <p className="text-xl md:text-2xl font-bold mb-12 text-foreground/80 max-w-2xl mx-auto uppercase tracking-wide">
                            Jadilah bagian dari ekosistem digital kami dan raih potensi maksimal brand Anda bersama RBAdev.
                        </p>
                        <a href="/#contact" className="inline-flex items-center gap-4 px-12 py-6 bg-foreground text-background font-black uppercase tracking-widest border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all text-lg">
                            Mulai Konsultasi <ArrowRight className="w-8 h-8" />
                        </a>
                    </ScrollReveal>
                </div>
            </main>
        </div>
    );
}
