import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import ServiceList, { ServiceSkeleton } from "@/components/Home/ServiceList";
import ProjectList, { ProjectSkeleton } from "@/components/Home/ProjectList";
import { CheckCircle2, ChevronRight, Globe, Code2, ArrowRight, Laptop, MessageCircle, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getPartners } from "@/lib/actions/partner";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const { data: partners = [] } = await getPartners();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main>
        {/* HERO SECTION - CONCEPT 5: THE PURE BENTO (REFINE) */}
        <section className="pt-24 sm:pt-28 md:pt-32 pb-24 md:pb-32 px-4 sm:px-6 md:px-12 bg-background relative overflow-hidden flex items-center border-b-4 border-foreground">
          <div className="max-w-[1400px] w-full mx-auto relative z-10">
            {/* 3-Box Bento Layout */}
            <div className="flex flex-col gap-6">
              
              {/* Box 1: The Statement (Top Full Width) */}
              <ScrollReveal delay={0.1}>
                <div className="bg-white border-4 border-foreground p-8 md:p-12 lg:p-14 rounded-[2.5rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                  <div className="relative z-10">
                    <h1 className="text-5xl md:text-7xl lg:text-[8rem] font-black tracking-tighter uppercase leading-[0.8] mb-0">
                      Kerja <br />
                      <span className="italic font-serif text-secondary lowercase">Jadi</span> <br />
                      Mudah.
                    </h1>
                  </div>
                  
                  {/* Subtle Graphic Accent */}
                  <div className="absolute top-0 right-0 p-8 md:p-12 opacity-[0.03] select-none pointer-events-none">
                    <span className="text-[12rem] md:text-[16rem] font-black leading-none">RBA</span>
                  </div>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Box 2: The Mission (Bottom Left) */}
                <ScrollReveal delay={0.2}>
                  <div className="bg-[#fff133] border-4 border-foreground p-8 md:p-10 rounded-[2.5rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-full flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4 md:mb-6">The Mission</h3>
                    <p className="font-bold text-lg md:text-xl lg:text-2xl leading-relaxed text-foreground/80">
                      Mendampingi digitalisasi bisnis Anda. Mengubah proses manual menjadi ekosistem digital otomatis yang tak merepotkan.
                    </p>
                  </div>
                </ScrollReveal>

                {/* Box 3: The Approach & Action (Bottom Right) */}
                <ScrollReveal delay={0.3}>
                  <div className="bg-foreground text-background border-4 border-foreground p-8 md:p-10 rounded-[2.5rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] h-full flex flex-col justify-between group">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4 md:mb-6">The Approach</h3>
                      <p className="font-bold text-base md:text-lg leading-relaxed opacity-70 mb-8 md:mb-10">
                        Kami adalah partner strategis jangka panjang. Membantu dari riset, desain, eksekusi, hingga pemeliharaan sistem secara menyeluruh.
                      </p>
                    </div>

                    <a href="#contact" className="inline-flex items-center justify-between px-8 py-5 bg-primary text-foreground font-black uppercase tracking-[0.2em] text-sm border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all group-hover:bg-white duration-300">
                      Pesan Sekarang
                      <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
                    </a>
                  </div>
                </ScrollReveal>
              </div>

            </div>
          </div>
        </section>

        {/* STRATEGIC PARTNERS SECTION - CONCEPT 3: SPLIT-BENTO MARQUEE */}
        <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-background border-b-4 border-foreground overflow-hidden">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Side: Static Info Box */}
              <ScrollReveal delay={0.1} direction="right" className="lg:col-span-5 bg-secondary border-4 border-foreground rounded-[2rem] p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between group transform hover:-translate-y-1 transition-transform relative overflow-hidden">
                <div className="relative z-10">
                  <div className="inline-flex items-center px-3 py-1 bg-white border-2 border-foreground text-foreground text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    Social Proof
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-6">
                    Strategic <br />
                    <span className="italic font-serif text-primary lowercase">Partners.</span>
                  </h2>
                </div>

                <div className="relative z-10">
                  <p className="text-white/80 font-bold text-sm md:text-base mb-8 uppercase tracking-widest leading-relaxed">
                    Membangun ekosistem teknologi bersama institusi terbaik.
                  </p>
                  <Link href="/partners" className="inline-flex items-center gap-3 px-6 py-4 bg-white border-2 border-foreground text-foreground font-black uppercase tracking-widest text-xs md:text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all group/btn">
                    Read Stories <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Decorative background text */}
                <span className="absolute -bottom-10 -right-10 text-[12rem] font-black text-white/[0.05] select-none pointer-events-none transform -rotate-12">
                  TRUST
                </span>
              </ScrollReveal>

              {/* Right Side: Bento Badge Grid (More Reliable than Marquee) */}
              <ScrollReveal delay={0.2} direction="left" className="lg:col-span-7 bg-white border-4 border-foreground rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col transform hover:-translate-y-1 transition-transform relative overflow-hidden">
                <div className="p-6 md:p-8 grid grid-cols-2 sm:grid-cols-3 gap-4 h-full">
                  {partners.length === 0 ? (
                    [...Array(6)].map((_, i) => (
                      <div key={i} className="aspect-square bg-slate-50 border-2 border-foreground/10 rounded-xl flex items-center justify-center italic text-[10px] opacity-20">
                        PARTNER_PLACEHOLDER
                      </div>
                    ))
                  ) : (
                    partners.slice(0, 5).map((partner: any) => (
                      <div key={partner.id} className="group/badge relative aspect-square bg-slate-50 border-2 border-foreground rounded-2xl flex flex-col items-center justify-center p-4 hover:bg-primary hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all text-center">
                        {partner.logo_url ? (
                          <div className="relative w-full h-full grayscale group-hover/badge:grayscale-0 transition-all scale-90 group-hover/badge:scale-105">
                            <Image src={partner.logo_url} alt={partner.name} fill className="object-contain" />
                          </div>
                        ) : (
                          <span className="font-black uppercase tracking-tighter text-xs md:text-sm leading-tight leading-none">
                            {partner.name}
                          </span>
                        )}
                      </div>
                    ))
                  )}

                  {/* View All "Bento" Tile */}
                  <Link href="/partners" className="aspect-square bg-foreground text-background border-2 border-foreground rounded-2xl flex flex-col items-center justify-center p-4 hover:bg-secondary transition-colors group/all">
                    <span className="font-black uppercase tracking-widest text-[10px] md:text-xs mb-2">View All</span>
                    <ArrowRight className="w-5 h-5 group-hover/all:translate-x-1 transition-transform" />
                  </Link>
                </div>
                
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <Globe className="w-24 h-24" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* SERVICES - CONCEPT 2: BENTO LAYER STACK (SPLIT HYBRID) */}
        <section id="services" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-background border-b-4 border-foreground overflow-hidden">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Side: Manifesto Box */}
              <ScrollReveal delay={0.1} direction="right" className="lg:col-span-5 bg-foreground border-4 border-foreground rounded-[2rem] p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between transform hover:-translate-y-1 transition-transform relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="inline-flex items-center px-3 py-1 bg-primary text-foreground text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    Main Services
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black text-background uppercase tracking-tighter leading-[0.9] mb-8">
                    Ekosistem <br />
                    Integrasi untuk <br />
                    <span className="italic font-serif text-primary lowercase">Semua.</span>
                  </h2>
                </div>

                <div className="relative z-10">
                  <p className="text-background/60 font-bold text-sm md:text-base mb-10 uppercase tracking-widest leading-relaxed max-w-sm">
                    Kami tidak hanya membangun software, kami membangun jalur aspirasi digital Anda.
                  </p>
                  <a href="#contact" className="inline-flex items-center gap-3 px-8 py-4 bg-primary border-2 border-foreground text-foreground font-black uppercase tracking-widest text-xs md:text-sm shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all group/btn">
                    Get Consultation <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>

                {/* Decorative background text */}
                <span className="absolute -bottom-10 -right-10 text-[12rem] font-black text-white/[0.03] select-none pointer-events-none transform rotate-12">
                  WORK
                </span>
              </ScrollReveal>

              {/* Right Side: Service Grid */}
              <div className="lg:col-span-7">
                <Suspense fallback={<ServiceSkeleton />}>
                  <ServiceList />
                </Suspense>
              </div>
            </div>
          </div>
        </section>


        {/* PORTFOLIO - CONCEPT 2: THE PORTFOLIO TIMELINE (HORIZONTAL STRIP) */}
        <section id="work" className="py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-background border-b-4 border-foreground relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto relative z-10">
            <div className="text-center mb-24 md:mb-40">
              <ScrollReveal>
                <div className="inline-flex items-center px-4 py-1.5 bg-foreground text-background text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] border border-foreground">
                  Our Work
                </div>
                <h2 className="text-5xl md:text-[8rem] font-black tracking-tighter text-foreground uppercase leading-[0.85] mb-10">
                  Katalog Karya <br />
                  <span className="italic font-serif text-primary lowercase underline decoration-8 underline-offset-[-5px]">Terpilih</span> <br />
                  Kami.
                </h2>
                <div className="flex items-center justify-center gap-4">
                  <div className="h-px w-20 bg-foreground/10"></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  <div className="h-px w-20 bg-foreground/10"></div>
                </div>
              </ScrollReveal>
            </div>

            <Suspense fallback={<ProjectSkeleton />}>
              <ProjectList />
            </Suspense>

            <div className="mt-20 text-center">
              <ScrollReveal delay={0.3}>
                <Link href="/work" className="inline-flex items-center gap-4 text-sm md:text-xl font-black uppercase tracking-[0.2em] group">
                  <span className="border-b-4 border-primary group-hover:bg-primary group-hover:text-background transition-all px-2 py-1">Lihat Seluruh Arsip</span>
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* CONSULTATION - CONCEPT 3: THE BLUEPRINT STRIP (TIMELINE CONTINUATION) */}
        <section id="contact" className="py-24 md:py-32 lg:py-40 px-4 sm:px-6 md:px-12 bg-background border-b-4 border-foreground relative overflow-hidden">
          {/* Blueprint Grid Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
          </div>

          <div className="max-w-[1400px] mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-20 pt-16 md:pt-24">
              
              {/* Left: Headline & Manifesto - Aligned to Start */}
              <div className="w-full lg:w-5/12 pt-8">
                <ScrollReveal delay={0.1}>
                  <div className="inline-flex items-center gap-3 mb-10">
                    <div className="w-16 h-1 bg-primary"></div>
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-foreground/40 text-glow-sm">Secure Implementation</span>
                  </div>
                  
                  <h2 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.8] mb-12">
                    Konsultasikan <br />
                    <span className="italic font-serif text-secondary lowercase underline decoration-8 underline-offset-8">Visi</span> Anda.
                  </h2>

                  <div className="relative mb-16">
                    <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary via-secondary/20 to-transparent"></div>
                    <p className="font-bold text-lg md:text-xl leading-relaxed text-foreground/70 max-w-lg italic font-serif">
                      "Kami tidak sekadar membangun kode; kami merancang instrumen pertumbuhan yang adaptif bagi bisnis Anda di era digital."
                    </p>
                  </div>

                  {/* New: Subtle Trust/Process Footer to fill space */}
                  <div className="pt-12 border-t-2 border-foreground/5 grid grid-cols-2 gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest mb-3 text-secondary">Operational Hours</p>
                      <p className="text-sm font-bold uppercase leading-tight">Mon — Fri <br /> 09:00 - 17:00 WIB</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest mb-3 text-secondary">Consultation Type</p>
                      <p className="text-sm font-bold uppercase leading-tight">Remote First <br /> & On-Site Meeting</p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right: Floating Contact Center */}
              <div className="w-full lg:w-6/12 xl:w-5/12">
                <ScrollReveal delay={0.2} direction="left">
                  <div className="bg-white border-4 border-foreground rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-10 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] transition-all duration-500">
                    <div className="flex items-center justify-between mb-8 border-b-2 border-foreground/5 pb-6">
                      <div>
                        <h3 className="text-xl md:text-3xl font-black uppercase tracking-tighter leading-none mb-1">Pesan Cepat</h3>
                        <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Inquiry form</p>
                      </div>
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary flex items-center justify-center border-2 md:border-4 border-foreground rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <ArrowRight className="w-6 h-6 md:w-7 md:h-7 text-foreground -rotate-45" />
                      </div>
                    </div>
                    
                    <div className="brutalist-contact-form mb-10">
                      <ContactForm />
                    </div>

                    <div className="border-t-2 border-foreground/10 pt-8 mt-8">
                        <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.3em] mb-6 text-center">Atau Hubungi Kami Melalui</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <a 
                                href="https://wa.me/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 px-6 py-4 bg-[#25D366] border-4 border-foreground rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-black uppercase text-xs tracking-widest text-foreground"
                            >
                                <MessageCircle className="w-5 h-5" /> WhatsApp
                            </a>
                            <a 
                                href="mailto:hello@rbadev.com"
                                className="flex items-center justify-center gap-3 px-6 py-4 bg-[#4a9eff] border-4 border-foreground rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-black uppercase text-xs tracking-widest text-foreground"
                            >
                                <Mail className="w-5 h-5" /> Email Direct
                            </a>
                        </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

            </div>
          </div>
        </section>
      </main>

      <footer className="py-10 md:py-12 px-6 bg-primary text-primary-foreground border-t-4 border-foreground">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-background flex items-center justify-center rounded-xl border-2 md:border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Code2 className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
            </div>
            <div className="flex items-center mt-2 sm:mt-0">
              <p className="font-black uppercase tracking-widest text-background text-lg md:text-xl ml-2">RBA<span className="text-foreground">dev.</span></p>
              <span className="font-bold border-l-2 md:border-l-4 border-foreground pl-3 md:pl-4 ml-3 md:ml-4 text-background text-sm md:text-base">© {new Date().getFullYear()}</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-xs md:text-sm font-black uppercase tracking-wider text-background">
            <Link href="/admin/login" className="hover:text-foreground hover:underline transition-all">Admin Portal</Link>
            <a href="#" className="hover:text-foreground hover:underline transition-all">Privacy Policy</a>
            <a href="#" className="hover:text-foreground hover:underline transition-all">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
