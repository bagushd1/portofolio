-- Migration: Add gallery_urls column to projects table
-- Date: 2026-03-31

ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS gallery_urls TEXT[] DEFAULT '{}';

-- Optional: Update existing projects to have an empty array if NULL
UPDATE projects SET gallery_urls = '{}' WHERE gallery_urls IS NULL;
