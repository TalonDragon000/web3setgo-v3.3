/*
  # Add Footer CTA Fields to Blogs Table

  ## Overview
  This migration adds footer call-to-action (CTA) functionality to blog posts,
  allowing authors to guide readers to related content or interactive simulations.

  ## Changes

  1. **New Fields Added to blogs Table**
    - `footer_enabled` (boolean, nullable, default false)
      - Toggles whether the footer CTA is displayed for this blog post
    - `footer_type` (text, nullable)
      - Specifies the CTA category: 'blog' or 'sim'
      - 'blog' links to another blog post
      - 'sim' links to an interactive simulation
    - `footer_target_slug` (text, nullable)
      - Stores the slug of the target blog post or simulation
      - Used to fetch and display the linked content

  ## Design Decisions

  1. **Nullable Fields**: All new fields are nullable to ensure backward compatibility
     with existing blog posts. Existing posts will have NULL values by default.

  2. **No Foreign Keys**: We intentionally avoid foreign key constraints to allow
     flexibility in content management. The application layer will handle validation
     and gracefully hide CTAs when target content is unpublished or deleted.

  3. **Type Constraint**: We add a check constraint to ensure footer_type is either
     'blog', 'sim', or NULL for data integrity.

  ## Usage
  - Authors can enable footer CTAs in the blog editor
  - Select target content from published blogs or simulations
  - CTA automatically hides if target becomes unavailable
*/

-- Add footer_enabled field
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blogs' AND column_name = 'footer_enabled'
  ) THEN
    ALTER TABLE blogs ADD COLUMN footer_enabled boolean DEFAULT false;
  END IF;
END $$;

-- Add footer_type field
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blogs' AND column_name = 'footer_type'
  ) THEN
    ALTER TABLE blogs ADD COLUMN footer_type text DEFAULT NULL;
  END IF;
END $$;

-- Add footer_target_slug field
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blogs' AND column_name = 'footer_target_slug'
  ) THEN
    ALTER TABLE blogs ADD COLUMN footer_target_slug text DEFAULT NULL;
  END IF;
END $$;

-- Add check constraint for valid footer types
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'blogs_footer_type_check'
  ) THEN
    ALTER TABLE blogs ADD CONSTRAINT blogs_footer_type_check 
      CHECK (footer_type IN ('blog', 'sim') OR footer_type IS NULL);
  END IF;
END $$;