-- ==============================================
-- SQL Script: Tabel Messages untuk Website Portofolio
-- Database: Supabase (PostgreSQL)
-- ==============================================
-- Jalankan script ini di Supabase SQL Editor:
-- https://supabase.com/dashboard → Project → SQL Editor
-- ==============================================

-- 1. Buat tabel messages
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(200),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Aktifkan Row Level Security (RLS)
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Siapa saja bisa INSERT (pengunjung kirim pesan)
CREATE POLICY "Anyone can insert messages"
  ON messages FOR INSERT
  WITH CHECK (true);

-- 4. Policy: Hanya authenticated user yang bisa SELECT (admin lihat pesan)
CREATE POLICY "Authenticated users can read messages"
  ON messages FOR SELECT
  USING (auth.role() = 'authenticated');

-- 5. Policy: Hanya authenticated user yang bisa DELETE
CREATE POLICY "Authenticated users can delete messages"
  ON messages FOR DELETE
  USING (auth.role() = 'authenticated');

-- 6. Policy: Hanya authenticated user yang bisa UPDATE (misal: tandai sudah dibaca)
CREATE POLICY "Authenticated users can update messages"
  ON messages FOR UPDATE
  USING (auth.role() = 'authenticated');

-- ==============================================
-- Selesai! Tabel siap digunakan.
-- ==============================================
