-- Supabase SQL Script: Vercel Fixes
-- Run this SQL in your Supabase dashboard (SQL Editor)

-- Site Content Table for Dynamic Updates on Vercel
-- This replaces the local filesystem writes for "Save Changes" feature
CREATE TABLE IF NOT EXISTS site_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page TEXT NOT NULL,
  selector TEXT NOT NULL,
  content TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(page, selector)
);

-- Disable Row Level Security (to match the project's existing pattern)
ALTER TABLE site_content DISABLE ROW LEVEL SECURITY;

-- Index for faster lookups when serving pages
CREATE INDEX idx_site_content_page ON site_content(page);
