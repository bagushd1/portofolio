import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <div className="min-h-screen animated-gradient">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="text-lg font-bold gradient-text">
            Portofolio
          </a>
          <div className="flex items-center gap-6">
            <a
              href="#about"
              className="text-sm text-text-muted hover:text-foreground transition-colors"
            >
              Tentang
            </a>
            <a
              href="#services"
              className="text-sm text-text-muted hover:text-foreground transition-colors"
            >
              Layanan
            </a>
            <a
              href="#contact"
              className="text-sm px-4 py-2 rounded-lg bg-primary/10 text-primary-light hover:bg-primary/20 transition-all"
            >
              Kontak
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-ring" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse-ring" style={{ animationDelay: "1.5s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary-light border border-primary/20 mb-6">
              🚀 Selamat Datang di Portofolio Tim Kami
            </span>
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Kami Membangun{" "}
            <span className="gradient-text">Solusi Digital</span>{" "}
            yang Berdampak
          </h1>

          <p
            className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Tim developer & designer yang berdedikasi untuk menciptakan
            pengalaman web modern, cepat, dan memukau.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-xl font-medium text-sm text-white transition-all duration-300
                bg-gradient-to-r from-primary to-primary-dark hover:from-primary-light hover:to-primary
                hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] active:scale-[0.98]"
            >
              Hubungi Kami →
            </a>
            <a
              href="#about"
              className="px-8 py-3.5 rounded-xl font-medium text-sm text-text-muted transition-all duration-200
                border border-surface-border hover:border-text-dim hover:text-foreground"
            >
              Pelajari Lebih Lanjut
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-surface-border flex items-start justify-center p-1.5">
            <div className="w-1.5 h-2.5 rounded-full bg-text-dim" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-medium text-accent uppercase tracking-widest">
              Tentang Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
              Tim yang <span className="gradient-text">Passionate</span>
            </h2>
            <p className="text-text-muted max-w-xl mx-auto">
              Kami adalah sekelompok developer dan designer yang percaya bahwa
              teknologi bisa membuat perbedaan nyata.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "⚡",
                title: "Cepat & Performa Tinggi",
                desc: "Website yang kami buat dioptimasi untuk kecepatan dan performa terbaik.",
              },
              {
                icon: "🎨",
                title: "Desain Modern",
                desc: "UI/UX yang clean, intuitif, dan mengikuti tren desain terkini.",
              },
              {
                icon: "🔒",
                title: "Aman & Terpercaya",
                desc: "Keamanan data menjadi prioritas utama dalam setiap proyek yang kami kerjakan.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-medium text-accent uppercase tracking-widest">
              Layanan Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
              Apa yang Bisa <span className="gradient-text">Kami Bantu</span>?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: "🌐",
                title: "Web Development",
                desc: "Membangun website modern dengan teknologi terkini seperti React, Next.js, dan Node.js.",
                tags: ["React", "Next.js", "TypeScript"],
              },
              {
                icon: "📱",
                title: "Responsive Design",
                desc: "Desain yang tampil sempurna di semua perangkat — desktop, tablet, maupun mobile.",
                tags: ["Tailwind CSS", "Figma", "UI/UX"],
              },
              {
                icon: "🗄️",
                title: "Backend & API",
                desc: "Arsitektur backend yang scalable dan aman menggunakan teknologi serverless.",
                tags: ["Supabase", "PostgreSQL", "REST API"],
              },
              {
                icon: "🚀",
                title: "Deployment & CI/CD",
                desc: "Proses deploy otomatis dengan integrasi GitHub dan Vercel untuk alur kerja yang efisien.",
                tags: ["Vercel", "GitHub Actions", "CI/CD"],
              },
            ].map((item, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-6 hover:border-accent/30 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-text-muted leading-relaxed mb-3">
                      {item.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-xs bg-surface-light text-text-dim border border-surface-border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left side - Info */}
            <div>
              <span className="text-xs font-medium text-accent uppercase tracking-widest">
                Kontak
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
                Mari <span className="gradient-text">Berkolaborasi</span>
              </h2>
              <p className="text-text-muted mb-8 leading-relaxed">
                Punya proyek menarik atau ingin berdiskusi? Kirim pesan kepada
                kami melalui formulir ini. Kami akan merespons secepat mungkin!
              </p>

              <div className="space-y-4">
                {[
                  { icon: "📧", label: "Email", value: "tim@portofolio.dev" },
                  { icon: "📍", label: "Lokasi", value: "Indonesia" },
                  { icon: "⏰", label: "Respons", value: "1-2 hari kerja" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span className="w-10 h-10 rounded-lg bg-surface-light border border-surface-border flex items-center justify-center">
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-text-dim text-xs">{item.label}</p>
                      <p className="text-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Form */}
            <div className="glass rounded-2xl p-6 md:p-8 glow">
              <h3 className="text-lg font-semibold mb-6">Kirim Pesan</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-surface-border">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-dim">
            © 2026 <span className="gradient-text font-medium">Portofolio Tim</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-text-dim hover:text-foreground transition-colors">
              GitHub
            </a>
            <a href="#" className="text-sm text-text-dim hover:text-foreground transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
