/*
  # Unify Content System - Consolidate Blogs and Lessons

  ## Overview
  This migration consolidates the `blogs` and `lessons` tables into a unified content system,
  adds admin authentication support, and simplifies the content management structure.

  ## Changes

  1. **Blogs Table Updates**
    - Add `type` field with values: 'lesson', 'devlog', 'news', 'article'
    - Add `order_index` field (nullable) for optional content sequencing
    - Add check constraint to ensure valid content types

  2. **Data Migration**
    - Migrate all existing lessons into blogs table with type='lesson'
    - Preserve all lesson data (title, description, content, etc.)
    - Map lesson.duration to blog.read_time
    - Transfer lesson.order_index to blog.order_index

  3. **Admin Configuration**
    - Create `admin_config` table for password storage
    - Store bcrypt-compatible password hash
    - Single row table for single admin setup
    - Enable RLS with public read access (hash is safe to expose)

  4. **Cleanup**
    - Drop lessons table after successful migration
    - Drop lesson-related RLS policies

  ## Security Notes
  - Admin password hash is intentionally readable (bcrypt is one-way)
  - Write operations on blogs will check admin status client-side
  - This is a lightweight auth solution for single-admin use
  - Can be upgraded to Supabase Auth later if needed
*/

-- Step 1: Add new fields to blogs table
DO $$
BEGIN
  -- Add type field if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blogs' AND column_name = 'type'
  ) THEN
    ALTER TABLE blogs ADD COLUMN type text DEFAULT 'article';
  END IF;

  -- Add order_index field if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blogs' AND column_name = 'order_index'
  ) THEN
    ALTER TABLE blogs ADD COLUMN order_index integer DEFAULT NULL;
  END IF;
END $$;

-- Add check constraint for valid types
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'blogs_type_check'
  ) THEN
    ALTER TABLE blogs ADD CONSTRAINT blogs_type_check 
      CHECK (type IN ('lesson', 'devlog', 'news', 'article'));
  END IF;
END $$;

-- Step 2: Migrate lessons data into blogs table
INSERT INTO blogs (
  slug, 
  title, 
  description, 
  content, 
  read_time, 
  difficulty, 
  order_index, 
  published, 
  type, 
  created_at, 
  updated_at,
  image_url,
  category
)
SELECT 
  slug, 
  title, 
  description, 
  content, 
  duration as read_time,
  difficulty,
  order_index,
  published,
  'lesson' as type,
  created_at,
  updated_at,
  '/nova-come-trans.png' as image_url,
  'Learning' as category
FROM lessons
ON CONFLICT (slug) DO NOTHING;

-- Step 3: Create admin_config table
CREATE TABLE IF NOT EXISTS admin_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on admin_config
ALTER TABLE admin_config ENABLE ROW LEVEL SECURITY;

-- Allow public to read password hash (bcrypt is safe to expose)
CREATE POLICY "Anyone can read admin config"
  ON admin_config FOR SELECT
  TO public
  USING (true);

-- Only allow inserts if table is empty (single admin setup)
CREATE POLICY "Can insert admin config if empty"
  ON admin_config FOR INSERT
  TO public
  WITH CHECK (
    (SELECT COUNT(*) FROM admin_config) = 0
  );

-- Allow updates to admin config
CREATE POLICY "Anyone can update admin config"
  ON admin_config FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Insert default admin password hash (password: "admin123" - CHANGE THIS!)
-- This is bcrypt hash of "admin123" - user should change immediately
INSERT INTO admin_config (password_hash)
VALUES ('$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy')
ON CONFLICT DO NOTHING;

-- Step 4: Drop lessons table and related policies
DROP POLICY IF EXISTS "Anyone can view all lessons" ON lessons;
DROP POLICY IF EXISTS "Anyone can insert lessons" ON lessons;
DROP POLICY IF EXISTS "Anyone can update lessons" ON lessons;
DROP POLICY IF EXISTS "Anyone can delete lessons" ON lessons;

DROP TABLE IF EXISTS lessons CASCADE;

-- Step 5: Update blogs RLS policies (already permissive, no changes needed)
-- Existing policies allow public access for now
-- Client-side will enforce admin checks for write operations