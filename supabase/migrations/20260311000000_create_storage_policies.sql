-- ==============================================
-- SQL Script: Storage Bucket Policies
-- Database: Supabase (PostgreSQL)
-- ==============================================
-- Storage RLS policies untuk bucket portfolio-assets
-- Bucket HARUS dibuat via Dashboard atau auto-ensured via code.
-- Script ini hanya mengatur policies.
-- ==============================================

-- 1. Policy: Siapa saja bisa melihat file (gambar publik)
INSERT INTO storage.policies (name, bucket_id, operation, definition, check_expression)
SELECT
  'Public read access for portfolio-assets',
  'portfolio-assets',
  'SELECT',
  'true',
  NULL
WHERE NOT EXISTS (
  SELECT 1 FROM storage.policies
  WHERE name = 'Public read access for portfolio-assets'
    AND bucket_id = 'portfolio-assets'
);

-- 2. Policy: Authenticated users bisa upload file
INSERT INTO storage.policies (name, bucket_id, operation, definition, check_expression)
SELECT
  'Authenticated users can upload to portfolio-assets',
  'portfolio-assets',
  'INSERT',
  NULL,
  '(auth.role() = ''authenticated'')'
WHERE NOT EXISTS (
  SELECT 1 FROM storage.policies
  WHERE name = 'Authenticated users can upload to portfolio-assets'
    AND bucket_id = 'portfolio-assets'
);

-- 3. Policy: Authenticated users bisa delete file
INSERT INTO storage.policies (name, bucket_id, operation, definition, check_expression)
SELECT
  'Authenticated users can delete from portfolio-assets',
  'portfolio-assets',
  'DELETE',
  '(auth.role() = ''authenticated'')',
  NULL
WHERE NOT EXISTS (
  SELECT 1 FROM storage.policies
  WHERE name = 'Authenticated users can delete from portfolio-assets'
    AND bucket_id = 'portfolio-assets'
);
