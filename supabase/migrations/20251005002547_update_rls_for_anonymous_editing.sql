/*
  # Update RLS Policies for Anonymous Editing

  1. Changes
    - Drop existing restrictive policies that require authentication
    - Add new permissive policies allowing anonymous users to edit content
    - Keep published content publicly readable
    - Allow anyone to create, update, and delete blogs, lessons, and quizzes
  
  2. Security
    - This is a temporary setup for single-user development
    - Will be replaced with proper authentication and authorization later
    - Row Level Security remains enabled on all tables
*/

-- Drop existing restrictive policies for blogs
DROP POLICY IF EXISTS "Authenticated users can insert blogs" ON blogs;
DROP POLICY IF EXISTS "Authenticated users can update blogs" ON blogs;
DROP POLICY IF EXISTS "Authenticated users can delete blogs" ON blogs;

-- Drop existing restrictive policies for lessons
DROP POLICY IF EXISTS "Authenticated users can insert lessons" ON lessons;
DROP POLICY IF EXISTS "Authenticated users can update lessons" ON lessons;
DROP POLICY IF EXISTS "Authenticated users can delete lessons" ON lessons;

-- Drop existing restrictive policies for quizzes
DROP POLICY IF EXISTS "Authenticated users can insert quizzes" ON quizzes;
DROP POLICY IF EXISTS "Authenticated users can update quizzes" ON quizzes;
DROP POLICY IF EXISTS "Authenticated users can delete quizzes" ON quizzes;

-- Create new permissive policies for blogs
CREATE POLICY "Anyone can view all blogs"
  ON blogs FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert blogs"
  ON blogs FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update blogs"
  ON blogs FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete blogs"
  ON blogs FOR DELETE
  TO public
  USING (true);

-- Create new permissive policies for lessons
CREATE POLICY "Anyone can view all lessons"
  ON lessons FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert lessons"
  ON lessons FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update lessons"
  ON lessons FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete lessons"
  ON lessons FOR DELETE
  TO public
  USING (true);

-- Create new permissive policies for quizzes
CREATE POLICY "Anyone can view all quizzes"
  ON quizzes FOR SELECT
  TO public
  USING (true);

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