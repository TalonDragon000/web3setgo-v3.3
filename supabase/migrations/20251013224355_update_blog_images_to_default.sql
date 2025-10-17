/*
  # Update Blog Images to Use Default Gradient

  ## Overview
  This migration updates all existing blog entries that use old Nova mascot images
  to use empty image_url values, which will trigger the new gradient default display.

  ## Changes

  1. **Update Existing Blog Images**
    - Replace '/nova-come-trans.png' with empty string
    - Replace '/nova-come.png' with empty string
    - Replace '/nova-intro.png' with empty string
    - Replace '/nova-404.png' with empty string
    - Replace '/blog-bg.png' with empty string (if exists)

  2. **Update Default Value**
    - Change default value for image_url column to empty string
    - This ensures new entries use gradient by default

  ## Security Notes
  - No RLS changes needed
  - Only affects image_url column data
  - Backward compatible - custom images remain unchanged
*/

-- Update all blog entries using old Nova mascot images to empty string
UPDATE blogs 
SET image_url = '' 
WHERE image_url IN (
  '/nova-come-trans.png',
  '/nova-come.png',
  '/nova-intro.png',
  '/nova-404.png',
  '/blog-bg.png'
);

-- Update the default value for future entries
ALTER TABLE blogs 
ALTER COLUMN image_url SET DEFAULT '';

-- Also update any NULL values to empty string for consistency
UPDATE blogs 
SET image_url = '' 
WHERE image_url IS NULL;
