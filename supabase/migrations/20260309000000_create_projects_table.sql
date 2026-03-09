-- ==============================================
-- SQL Script: Tabel Projects untuk Website Portofolio
-- Database: Supabase (PostgreSQL)
-- ==============================================
-- Jalankan via: supabase db push
-- ==============================================

-- 1. Buat tabel projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  live_link TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Aktifkan Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Siapa saja bisa SELECT (pengunjung lihat portofolio)
CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  USING (true);

-- 4. Policy: Hanya authenticated user yang bisa INSERT
CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- 5. Policy: Hanya authenticated user yang bisa UPDATE
CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  USING (auth.role() = 'authenticated');

-- 6. Policy: Hanya authenticated user yang bisa DELETE
CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  USING (auth.role() = 'authenticated');

-- ==============================================
-- Storage Bucket: portfolio-assets
-- CATATAN: Bucket harus dibuat manual di Supabase Dashboard
-- karena storage management tidak didukung via SQL migration.
-- 
-- Langkah:
-- 1. Buka Supabase Dashboard → Storage
-- 2. Klik "New bucket"
-- 3. Nama: portfolio-assets
-- 4. Centang "Public bucket" (agar gambar bisa diakses publik)
-- 5. Klik "Create bucket"
-- ==============================================
