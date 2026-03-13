-- SQL Seeder: Portofolio & Blog (RBAdev)
-- Jalankan kode ini di Supabase SQL Editor untuk mengisi konten awal yang profesional.

-- 1. SEEDER: ARTIKEL BLOG
INSERT INTO articles (title, slug, content, published, image_url)
VALUES 
(
    'Membangun Sistem Enterprise yang Skalabel dengan Next.js 15',
    'membangun-sistem-enterprise-nextjs-15',
    'Next.js 15 membawa perubahan besar dalam cara kita menangani data di sisi server. Dengan diperkenalkannya pola async params dan optimasi caching terbaru, membangun aplikasi berskala besar menjadi lebih terstruktur.

### Mengapa Next.js 15?
Salah satu keunggulan utamanya adalah integrasi yang sangat ketat dengan **React Server Components**. Ini memungkinkan kita untuk merender komponen berat di server dan hanya mengirimkan HTML minimal ke client.

### Implementasi di RBAdev
Kami menggunakan pola *Partial Prerendering* (PPR) untuk memastikan bagian statis dari website dimuat instan, sementara data personal atau dinamis dimuat secara streaming. Hasilnya? User Experience yang sangat mulus tanpa "blank screen" saat loading.',
    true,
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200'
),
(
    'Keamanan Data di Era AI: Tantangan Baru bagi Startup',
    'keamanan-data-era-ai',
    'AI bukan hanya mempermudah pekerjaan kita, tapi juga memberikan tantangan keamanan baru. Pencurian data melalui prompt injection dan kebocoran data sensitif ke model LLM publik adalah risiko nyata.

### Strategi Pertahanan
1. **Data Masking**: Pastikan data sensitif tidak pernah menyentuh server AI pihak ketiga.
2. **Local LLM**: Untuk data rahasia proyek, gunakan model lokal yang berjalan di infrastruktur pribadi.
3. **Pemberian Izin (RBAC)**: Terapkan sistem izin yang ketat seperti RLS (Row Level Security) yang kami gunakan di Supabase.',
    true,
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200'
);

-- 2. SEEDER: PROJECT PORTOFOLIO
INSERT INTO projects (title, slug, description, tech_stack, challenge, solution, content)
VALUES 
(
    'Nexus Enterprise ERP',
    'nexus-enterprise-erp',
    'Sistem manajemen sumber daya terintegrasi untuk perusahaan manufaktur dengan volume data tinggi.',
    ARRAY['Next.js', 'PostgreSQL', 'Redis', 'Docker'],
    'Klien menghadapi masalah sinkronisasi data antara bagian gudang dan bagian akuntansi yang sering mengalami keterlambatan (delay) hingga 24 jam.',
    'Kami membangun arsitektur Event-Driven menggunakan Redis Pub/Sub untuk memastikan sinkronisasi data terjadi secara real-time (kurang dari 1 detik).',
    'ERP ini bukan sekadar software pencatatan, melainkan otak dari seluruh operasi perusahaan. Dengan dasbor analitik AI, pimpinan perusahaan dapat memprediksi stok barang 3 bulan ke depan.'
),
(
    'EduSmart School System',
    'edusmart-school-system',
    'Platform manajemen sekolah modern yang mencakup monitoring nilai, absensi digital, dan sistem keuangan.',
    ARRAY['React', 'Supabase', 'Tailwind', 'Framer Motion'],
    'Proses pembayaran sekolah masih dilakukan manual, memakan waktu staf hingga ratusan jam per bulan hanya untuk verifikasi bukti transfer.',
    'Integrasi Payment Gateway otomatis yang langsung mengubah status tagihan siswa menjadi "Lunas" setelah pembayaran berhasil divalidasi oleh sistem.',
    'Platform EduSmart kini digunakan oleh lebih dari 10 sekolah dengan total 5.000+ siswa aktif yang terpantau setiap harinya.'
);
