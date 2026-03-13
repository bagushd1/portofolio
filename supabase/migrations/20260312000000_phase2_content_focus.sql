-- ==============================================
-- SQL Script: Phase 2 - Content Focus & Case Studies
-- ==============================================

-- 1. Update projects table
ALTER TABLE projects DROP COLUMN IF EXISTS github_link;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS content TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS challenge TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS solution TEXT;

-- Generate slugs for existing projects (if any)
UPDATE projects SET slug = lower(replace(title, ' ', '-')) WHERE slug IS NULL;

-- 2. Buat tabel services (Layanan Dinamis)
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT, -- Nama ikon Lucide
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Aktifkan RLS pada services
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view services
CREATE POLICY "Anyone can view services"
  ON services FOR SELECT
  USING (true);

-- Policy: Authenticated users can manage services
CREATE POLICY "Authenticated users can manage services"
  ON services FOR ALL
  USING (auth.role() = 'authenticated');

-- 3. Buat tabel articles (Engineering Blog / Deep Case Studies)
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  author_id UUID DEFAULT auth.uid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Aktifkan RLS pada articles
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view published articles
CREATE POLICY "Anyone can view published articles"
  ON articles FOR SELECT
  USING (published = true OR auth.role() = 'authenticated');

-- Policy: Authenticated users can manage articles
CREATE POLICY "Authenticated users can manage articles"
  ON articles FOR ALL
  USING (auth.role() = 'authenticated');

-- Trigger for updated_at on articles
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_articles_updated_at
BEFORE UPDATE ON articles
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

-- ==============================================
-- 4. Seed Initial Services (Based on current hardcoded UI)
-- ==============================================
INSERT INTO services (title, description, icon, order_index)
VALUES 
('Sistem Terpadu', 'Membangun ekosistem utuh. Dari sistem keuangan sekolah, manajemen siswa, hingga operasional kantor skala besar.', 'Laptop', 1),
('User Friendly', 'Antarmuka yang dipahami seketika. Kami merancang sistem yang sangat ramah bagi pengguna awam teknologi sekalipun.', 'Layout', 2),
('Infrastruktur Aman', 'Perlindungan data mutakhir. Sistem Anda akan terus bisa diakses dengan stabil mesipun ribuan pengunjung masuk bersamaan.', 'Database', 3)
ON CONFLICT DO NOTHING;
