-- ==============================================
-- SQL Script: Update Projects & Testimonials
-- Misi: Backend Infrastructure & Mock Data
-- ==============================================

-- 1. Tambah kolom github_link ke tabel projects
ALTER TABLE projects ADD COLUMN IF NOT EXISTS github_link TEXT;

-- 2. Buat tabel testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  company TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Aktifkan RLS pada testimonials
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies: Testimonials
CREATE POLICY "Anyone can view testimonials"
  ON testimonials FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert testimonials"
  ON testimonials FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update testimonials"
  ON testimonials FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete testimonials"
  ON testimonials FOR DELETE
  USING (auth.role() = 'authenticated');

-- ==============================================
-- 5. Insert Mock Data untuk Tim Frontend
-- ==============================================

-- Mock Projects
INSERT INTO projects (title, description, image_url, tech_stack, live_link, github_link)
VALUES 
(
  'E-Commerce Dashboard Analytics',
  'Platform analitik komprehensif untuk melacak penjualan, inventaris, dan perilaku pelanggan secara real-time. Dilengkapi dengan grafik interaktif dan laporan otomatis yang dapat diekspor ke PDF.',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
  ARRAY['Next.js', 'Tailwind', 'Supabase', 'Recharts'],
  'https://demo.ecommerce-analytics.com',
  'https://github.com/example/ecommerce-analytics'
),
(
  'Aplikasi Manajemen Keuangan Pribadi',
  'Aplikasi mobile-first untuk membantu pengguna mencatatkan pengeluaran, mengatur anggaran bulanan, dan mencapai tujuan finansial. Mendukung sinkronisasi multi-device.',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3',
  ARRAY['React Native', 'Expo', 'Node.js', 'PostgreSQL'],
  'https://demo.finance-app.com',
  'https://github.com/example/finance-app'
),
(
  'Portal Berita Komunitas Lokal',
  'Website berita ringan, cepat, dan SEO-friendly yang dirancang untuk komunitas lokal. Mendukung fitur komentar, bookmark artikel, dan sistem manajemen konten (CMS) kustom.',
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c',
  ARRAY['Next.js', 'Tailwind', 'Prisma', 'Vite'],
  'https://demo.local-news.com',
  NULL
);

-- Mock Testimonials
INSERT INTO testimonials (name, company, content, rating)
VALUES
(
  'Andi Setiawan',
  'PT Sukses Makmur',
  'Tim ini bekerja dengan sangat profesional! Website e-commerce kami selesai tepat waktu dan performanya jauh lebih cepat dari sebelumnya. Sangat direkomendasikan.',
  5
),
(
  'Sarah Diana',
  'Startup Kreatif',
  'Komunikasi yang luar biasa. Mereka tidak hanya membuat aplikasi sesuai pesanan, tetapi juga memberikan saran-saran UX yang sangat membantu bisnis kami tumbuh.',
  5
),
(
  'Budi Santoso',
  'Toko Berdikari',
  'Desainnya sangat modern dan sesuai dengan branding perusahaan. Sistem adminnya juga mudah digunakan bahkan untuk staf kami yang awam teknologi.',
  4
);
