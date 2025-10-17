/*
  # Expand Quiz Table Schema
  
  Add new fields to support both knowledge and personality quiz types:
  - `quiz_type` - Distinguishes between 'knowledge' and 'personality' quizzes
  - `icon` - Icon name reference for display
  - `color_scheme` - Tailwind gradient classes for styling
  - `result_categories` - JSONB for personality quiz results
  - `slug` - URL-friendly identifier for routing
  - `order_index` - Display order
  
  Update RLS policies to match other content tables.
*/

-- Add new fields to quizzes table
DO $$
BEGIN
  -- Add quiz_type field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quizzes' AND column_name = 'quiz_type'
  ) THEN
    ALTER TABLE quizzes ADD COLUMN quiz_type text DEFAULT 'knowledge';
  END IF;

  -- Add icon field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quizzes' AND column_name = 'icon'
  ) THEN
    ALTER TABLE quizzes ADD COLUMN icon text DEFAULT 'BookOpen';
  END IF;

  -- Add color_scheme field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quizzes' AND column_name = 'color_scheme'
  ) THEN
    ALTER TABLE quizzes ADD COLUMN color_scheme text DEFAULT 'from-success-500 to-ocean-500';
  END IF;

  -- Add result_categories field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quizzes' AND column_name = 'result_categories'
  ) THEN
    ALTER TABLE quizzes ADD COLUMN result_categories jsonb DEFAULT '{}';
  END IF;

  -- Add slug field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quizzes' AND column_name = 'slug'
  ) THEN
    ALTER TABLE quizzes ADD COLUMN slug text;
  END IF;

  -- Add order_index field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quizzes' AND column_name = 'order_index'
  ) THEN
    ALTER TABLE quizzes ADD COLUMN order_index integer DEFAULT 0;
  END IF;
END $$;

-- Add check constraint for valid quiz types
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'quizzes_quiz_type_check'
  ) THEN
    ALTER TABLE quizzes ADD CONSTRAINT quizzes_quiz_type_check 
      CHECK (quiz_type IN ('knowledge', 'personality'));
  END IF;
END $$;

-- Make slug unique (but allow NULL for backward compatibility)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'quizzes_slug_unique'
  ) THEN
    ALTER TABLE quizzes ADD CONSTRAINT quizzes_slug_unique UNIQUE (slug);
  END IF;
END $$;

-- Update existing quizzes to have slugs based on their titles
UPDATE quizzes
SET slug = lower(regexp_replace(regexp_replace(title, '[^\w\s-]', '', 'g'), '[\s_-]+', '-', 'g'))
WHERE slug IS NULL;

-- Update RLS policies for quizzes to match simulations pattern
DROP POLICY IF EXISTS "Anyone can view published quizzes" ON quizzes;
DROP POLICY IF EXISTS "Authenticated users can insert quizzes" ON quizzes;
DROP POLICY IF EXISTS "Authenticated users can update quizzes" ON quizzes;
DROP POLICY IF EXISTS "Authenticated users can delete quizzes" ON quizzes;

-- Create new policies (anonymous access, controlled client-side)
CREATE POLICY "Anyone can view published quizzes"
  ON quizzes FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Anyone can insert quizzes"
  ON quizzes FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update quizzes"
  ON quizzes FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete quizzes"
  ON quizzes FOR DELETE
  TO public
  USING (true);

