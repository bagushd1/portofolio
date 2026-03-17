-- Migration: Create Partners Table and Assets Bucket
-- Created: 2026-03-17

-- 1. Create partners table
CREATE TABLE IF NOT EXISTS public.partners (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    logo_url TEXT,
    description TEXT, -- Cerita kolaborasi (Markdown)
    website_url TEXT,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Row Level Security
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- 3. Access Policies
-- Allow public to view partners
DROP POLICY IF EXISTS "Allow public read access" ON public.partners;
CREATE POLICY "Allow public read access" ON public.partners
    FOR SELECT USING (true);

-- Allow authenticated users (Admin) to manage partners
DROP POLICY IF EXISTS "Allow all for authenticated users" ON public.partners;
CREATE POLICY "Allow all for authenticated users" ON public.partners
    USING (auth.role() = 'authenticated');

-- 4. Storage Setup
-- Ensure 'assets' bucket exists for logo uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('assets', 'assets', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for 'assets' bucket
-- Allow public read
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects 
    FOR SELECT USING (bucket_id = 'assets');

-- Allow authenticated uploads
DROP POLICY IF EXISTS "Authenticated Uploads" ON storage.objects;
CREATE POLICY "Authenticated Uploads" ON storage.objects 
    FOR INSERT WITH CHECK (bucket_id = 'assets' AND auth.role() = 'authenticated');

-- Allow authenticated updates
DROP POLICY IF EXISTS "Authenticated Update" ON storage.objects;
CREATE POLICY "Authenticated Update" ON storage.objects 
    FOR UPDATE USING (bucket_id = 'assets' AND auth.role() = 'authenticated');

-- Allow authenticated deletes
DROP POLICY IF EXISTS "Authenticated Delete" ON storage.objects;
CREATE POLICY "Authenticated Delete" ON storage.objects 
    FOR DELETE USING (bucket_id = 'assets' AND auth.role() = 'authenticated');
