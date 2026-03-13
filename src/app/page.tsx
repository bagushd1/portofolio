import ContactForm from "@/components/ContactForm";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import { getPublicProjects, getPublicServices } from "@/lib/api/portfolio";
import { CheckCircle2, ChevronRight, Laptop, Layout, Server, Database, Smartphone, LucideIcon, ArrowRight, Globe, Code2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const [projects, services] = await Promise.all([
    getPublicProjects(),
    getPublicServices()
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar />

      <main className="pt-20 pb-16">
        {/* HERO SECTION - Bento Brutalism & Partner Copy */}
        <section className="min-h-screen pt-4 sm:pt-8 md:pt-12 pb-16 md:pb-24 px-4 sm:px-6 md:px-12 bg-background border-b-4 border-foreground flex items-center">
          <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 md:gap-6 mt-16 md:mt-0">

            {/* Main Typo Box (Takes most space) */}
            <ScrollReveal delay={0.1} className="md:col-span-4 lg:col-span-8 bg-[#fdfbf7] dark:bg-card border-2 md:border-4 border-foreground rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 lg:p-16 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between group transform hover:-translate-y-1 transition-transform">
              <div>
                <div className="inline-flex items-center mb-6 md:mb-8 border-b-2 md:border-b-4 border-foreground pb-2 w-max max-w-full overflow-hidden">
                  <span className="text-xs sm:text-sm font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] text-foreground truncate">Strategic Partner</span>
                </div>

                <h1 className="text-[3.5rem] sm:text-6xl md:text-7xl lg:text-[7rem] font-black tracking-tighter text-foreground mb-6 md:mb-8 leading-[0.9] md:leading-[0.85] uppercase">
                  Kerja <br className="hidden sm:block" />
                  <span className="text-primary italic font-serif lowercase">Jadi</span><br />
                  Mudah.
                </h1>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-6 md:mt-8">
                <a href="#contact" className="inline-flex h-12 md:h-16 items-center justify-between px-6 md:px-8 bg-foreground text-background font-black uppercase tracking-wider text-xs md:text-sm hover:bg-primary transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] border-2 border-transparent hover:border-foreground min-w-[200px] md:min-w-[240px]">
                  <span>Pesan Sekarang</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform" />
                </a>
              </div>
            </ScrollReveal>

            {/* Side Mission Box */}
            <ScrollReveal delay={0.2} direction="left" className="md:col-span-2 lg:col-span-4 bg-[#fff133] border-2 md:border-4 border-foreground rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-center transform hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-background border-2 md:border-4 border-foreground rounded-full flex items-center justify-center mb-6 md:mb-8 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-foreground" />
              </div>
              <h3 className="font-black text-2xl md:text-3xl mb-3 md:mb-4 uppercase text-foreground">The Mission</h3>
              <p className="text-foreground font-bold text-base md:text-lg leading-relaxed">
                Mendampingi digitalisasi bisnis dan instansi Anda. Mengubah proses manual menjadi ekosistem digital otomatis yang tak merepotkan.
              </p>
            </ScrollReveal>

            {/* Bottom Graphic Box */}
            <ScrollReveal delay={0.3} className="md:col-span-2 lg:col-span-4 bg-[#4a9eff] border-2 md:border-4 border-foreground rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 overflow-hidden relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center min-h-[200px] md:min-h-[300px] transform hover:-translate-y-1 transition-transform group">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase leading-none text-center relative z-10 group-hover:scale-110 transition-transform">
                Apps & <br /> Web
              </h3>
              <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b')] bg-cover bg-center mix-blend-overlay"></div>
            </ScrollReveal>

            {/* Bottom Approach Box */}
            <ScrollReveal delay={0.4} direction="up" className="md:col-span-4 lg:col-span-8 bg-[#bbf7d0] border-2 md:border-4 border-foreground rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 lg:p-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-center transform hover:-translate-y-1 transition-transform">
              <h3 className="font-black text-2xl md:text-3xl mb-3 md:mb-4 uppercase text-foreground">The Approach</h3>
              <p className="text-foreground font-bold text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl">
                Partner strategis jangka panjang. Kami bantu dari riset, desain, eksekusi, hingga pemeliharaan sistem secara menyeluruh.
              </p>
            </ScrollReveal>

          </div>
        </section>

        {/* BRAND TICKER */}
        <div className="border-b-4 border-foreground bg-primary py-4 md:py-6 overflow-hidden flex whitespace-nowrap">
          <div className="flex gap-8 md:gap-16 items-center uppercase font-black tracking-widest text-primary-foreground text-lg sm:text-xl md:text-2xl px-4 md:px-6">
            <span className="hover:text-background transition-colors cursor-pointer">AcmeCorp</span>
            <span className="text-foreground">•</span>
            <span className="hover:text-background transition-colors cursor-pointer">GlobalTech</span>
            <span className="text-foreground">•</span>
            <span className="hover:text-background transition-colors cursor-pointer">Quantum</span>
            <span className="text-foreground">•</span>
            <span className="hover:text-background transition-colors cursor-pointer">NEXUS_</span>
            <span className="text-foreground">•</span>
            <span className="hover:text-background transition-colors cursor-pointer">DevOps Indonesia</span>
          </div>
        </div>

        {/* SERVICES - Bento Grid */}
        <section id="services" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-background border-b-4 border-foreground">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-10 md:mb-16 bg-foreground text-background border-2 md:border-4 border-foreground rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 md:p-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 transform hover:-translate-y-1 transition-transform">
              <div>
                <h2 className="text-lg md:text-xl font-black tracking-widest text-[#bbf7d0] uppercase mb-3 md:mb-4">Layanan Utama</h2>
                <p className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter text-background max-w-3xl leading-[1] md:leading-[0.9] uppercase">
                  EKOSISTEM INTEGRASI <span className="text-[#bbf7d0] italic font-serif lowercase">untuk</span> SEMUA.
                </p>
              </div>
            </div>

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
          </div>
        </section>

        {/* PORTFOLIO - Bento Style */}
        <section id="work" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-[#ff4a4a] border-b-4 border-foreground">
          <div className="max-w-[1400px] mx-auto">
            <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6 bg-background border-2 md:border-4 border-foreground rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 md:p-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-y-1 transition-transform">
              <div>
                <h2 className="text-lg md:text-xl font-black tracking-widest text-[#ff4a4a] uppercase mb-3 md:mb-4">Katalog Karya</h2>
                <p className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-foreground uppercase leading-[1] md:leading-[0.85]">
                  Telah <span className="text-[#ff4a4a] italic font-serif lowercase">ter-</span><br className="hidden sm:block" />selesaikan.
                </p>
              </div>
              <a href="#" className="inline-flex h-12 md:h-14 items-center justify-center px-6 md:px-8 border-2 md:border-4 border-foreground bg-[#fff133] text-foreground font-black uppercase tracking-wider text-xs md:text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                All Projects <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </a>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {!projects || projects.length === 0 ? (
                <div className="col-span-1 md:col-span-2 py-24 md:py-32 text-center border-2 md:border-4 border-foreground rounded-[1.5rem] md:rounded-[2.5rem] bg-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <p className="text-xl md:text-2xl font-black uppercase tracking-widest text-foreground">KOSONG.</p>
                  <p className="text-base md:text-lg font-bold text-muted-foreground mt-4 px-4">Belum ada proyek yang diterbitkan admin.</p>
                </div>
              ) : (
                projects.map((project, index) => (
                  <ScrollReveal delay={index * 0.1} key={project.id} className="group relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border-2 md:border-4 border-foreground bg-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 md:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col">
                    <Link href={`/work/${project.slug || project.id}`} className="block aspect-[4/3] bg-muted relative overflow-hidden border-b-2 md:border-b-4 border-foreground">
                      {project.image_url ? (
                        <Image src={project.image_url} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
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
                ))
              )}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION - Bento Brutalism */}
        <section id="contact" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-foreground text-background">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

            <ScrollReveal delay={0.1} direction="right" className="lg:col-span-12 xl:col-span-5 bg-background text-foreground rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 md:p-12 border-2 md:border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] md:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] flex flex-col justify-center">
              <div className="inline-flex items-center mb-6 md:mb-8 border-b-2 md:border-b-4 border-[#ff4a4a] pb-2 md:pb-3 w-max">
                <span className="text-xs md:text-sm font-black uppercase tracking-[0.1em] md:tracking-[0.2em] text-[#ff4a4a]">Konsultasi Partner</span>
              </div>

              <h2 className="text-[3.5rem] sm:text-5xl md:text-7xl font-black tracking-tighter mb-6 md:mb-8 leading-[0.9] uppercase">
                Mulai <br className="hidden sm:block" /><span className="font-serif italic text-primary lowercase mr-2">Langkah</span>Baru.
              </h2>
              <p className="text-foreground font-bold text-base md:text-xl mb-10 md:mb-12 leading-relaxed">
                Konsultasikan kebutuhan sistem Anda bersama kami. Kami mendampingi langkah Anda terlepas seberapa asing Anda dengan dunia teknologi.
              </p>

              <div className="inline-flex items-center gap-4 md:gap-6 p-4 md:p-6 rounded-[1.25rem] md:rounded-[1.5rem] bg-[#fff133] border-2 md:border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 hover:rotate-0 transition-transform">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-background border-2 md:border-4 border-foreground flex items-center justify-center shrink-0">
                  <Globe className="w-6 h-6 md:w-8 md:h-8 text-foreground" />
                </div>
                <div>
                  <h4 className="font-black text-lg md:text-xl uppercase text-foreground">Seluruh Indonesia</h4>
                  <p className="font-bold text-sm md:text-base text-foreground/80">Pendampingan Jarak Jauh (Online)</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} direction="left" className="lg:col-span-12 xl:col-span-7 bg-[#4a9eff] text-foreground rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 md:p-12 border-2 md:border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] md:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] flex flex-col justify-center mt-6 lg:mt-0">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6 md:mb-8 text-foreground uppercase bg-background inline-block px-3 md:px-4 py-1.5 md:py-2 border-2 md:border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1 self-start">Kirim Pesan</h3>
              <div className="brutalist-contact-form bg-background p-5 sm:p-6 md:p-8 rounded-[1rem] md:rounded-[1.5rem] border-2 md:border-4 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <ContactForm />
              </div>
            </ScrollReveal>

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
              <p className="font-black uppercase tracking-widest text-background text-lg md:text-xl ml-2">Nexus<span className="text-foreground">Tech.</span></p>
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
