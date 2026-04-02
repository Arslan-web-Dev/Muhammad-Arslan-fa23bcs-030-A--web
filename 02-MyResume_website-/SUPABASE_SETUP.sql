-- Supabase SQL Script: Setup for Resume Website
-- Run this SQL in your Supabase dashboard (SQL Editor)
-- Project: iqkgdueatwdlncwmpspd

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX idx_users_email ON users(email);

-- Disable Row Level Security for users table (allow full access)
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- API Blog Table
CREATE TABLE IF NOT EXISTS api_blog (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  auth TEXT,
  https BOOLEAN DEFAULT TRUE,
  link TEXT NOT NULL,
  date_added TIMESTAMP DEFAULT NOW(),
  seo_title TEXT,
  seo_description TEXT,
  keywords TEXT,
  tutorial TEXT,
  example_code TEXT,
  UNIQUE(name, link)
);

-- Disable Row Level Security for api_blog table (public access)
ALTER TABLE api_blog DISABLE ROW LEVEL SECURITY;

-- Index for faster lookups
CREATE INDEX idx_api_blog_name ON api_blog(name);
CREATE INDEX idx_api_blog_link ON api_blog(link);
CREATE INDEX idx_api_blog_category ON api_blog(category);
CREATE INDEX idx_api_blog_date_added ON api_blog(date_added);
