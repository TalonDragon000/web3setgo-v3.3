/*
  # Create Content Management Tables
  
  1. New Tables
    - `blogs`
      - `id` (uuid, primary key)
      - `slug` (text, unique) - URL-friendly identifier
      - `title` (text) - Blog title
      - `description` (text) - Short description
      - `content` (text) - Full blog content (markdown/HTML)
      - `read_time` (text) - Estimated reading time
      - `image_url` (text) - Featured image URL
      - `category` (text) - Blog category
      - `difficulty` (text) - Beginner/Intermediate/Advanced
      - `published` (boolean) - Publication status
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `lessons`
      - `id` (uuid, primary key)
      - `slug` (text, unique) - URL-friendly identifier
      - `title` (text) - Lesson title
      - `description` (text) - Short description
      - `content` (text) - Full lesson content
      - `duration` (text) - Estimated duration
      - `difficulty` (text) - Beginner/Intermediate/Advanced
      - `order_index` (integer) - Display order
      - `published` (boolean) - Publication status
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `quizzes`
      - `id` (uuid, primary key)
      - `lesson_id` (uuid, nullable) - Reference to lesson
      - `title` (text) - Quiz title
      - `description` (text) - Short description
      - `questions` (jsonb) - Quiz questions and answers
      - `passing_score` (integer) - Minimum score to pass
      - `published` (boolean) - Publication status
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Restrict write access to authenticated users only
*/

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  content text NOT NULL DEFAULT '',
  read_time text NOT NULL DEFAULT '5 min read',
  image_url text NOT NULL DEFAULT '/nova-come-trans.png',
  category text NOT NULL DEFAULT 'General',
  difficulty text NOT NULL DEFAULT 'Beginner',
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  content text NOT NULL DEFAULT '',
  duration text NOT NULL DEFAULT '15 min',
  difficulty text NOT NULL DEFAULT 'Beginner',
  order_index integer NOT NULL DEFAULT 0,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid REFERENCES lessons(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text NOT NULL,
  questions jsonb NOT NULL DEFAULT '[]',
  passing_score integer NOT NULL DEFAULT 70,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;

-- Policies for blogs (public read, authenticated write)
CREATE POLICY "Anyone can view published blogs"
  ON blogs FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Authenticated users can insert blogs"
  ON blogs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update blogs"
  ON blogs FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete blogs"
  ON blogs FOR DELETE
  TO authenticated
  USING (true);

-- Policies for lessons (public read, authenticated write)
CREATE POLICY "Anyone can view published lessons"
  ON lessons FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Authenticated users can insert lessons"
  ON lessons FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update lessons"
  ON lessons FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete lessons"
  ON lessons FOR DELETE
  TO authenticated
  USING (true);

-- Policies for quizzes (public read, authenticated write)
CREATE POLICY "Anyone can view published quizzes"
  ON quizzes FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Authenticated users can insert quizzes"
  ON quizzes FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update quizzes"
  ON quizzes FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete quizzes"
  ON quizzes FOR DELETE
  TO authenticated
  USING (true);

-- Insert placeholder blog data
INSERT INTO blogs (slug, title, description, content, read_time, image_url, category, difficulty) VALUES
  ('what-is-a-wallet', 'What is a Wallet?', 'Learn the basics of crypto wallets and how they keep your digital assets secure.', '<h1>What is a Wallet?</h1><p>A comprehensive guide to understanding crypto wallets...</p>', '5 min read', '/nova-come-trans.png', 'Basics', 'Beginner'),
  ('web2-vs-web3-explained', 'Web2 vs Web3 Explained', 'Understand the key differences between the internet we know and the decentralized web.', '<h1>Web2 vs Web3</h1><p>Exploring the evolution of the internet...</p>', '7 min read', '/nova-come-trans.png', 'Concepts', 'Beginner'),
  ('why-people-talk-about-blockchains', 'Why People Talk About Blockchains', 'Discover what makes blockchain technology revolutionary in simple, easy terms.', '<h1>Blockchain Basics</h1><p>Understanding the technology behind Web3...</p>', '6 min read', '/nova-come-trans.png', 'Technology', 'Beginner')
ON CONFLICT (slug) DO NOTHING;

-- Insert placeholder lesson data
INSERT INTO lessons (slug, title, description, content, duration, difficulty, order_index) VALUES
  ('getting-started', 'Getting Started with Web3', 'Your first steps into the world of decentralized technology.', '<h1>Welcome to Web3</h1><p>This interactive lesson will guide you...</p>', '15 min', 'Beginner', 1),
  ('understanding-wallets', 'Understanding Wallets', 'Learn how to safely manage your digital assets.', '<h1>Wallet Management</h1><p>Interactive exercises on wallet security...</p>', '20 min', 'Beginner', 2),
  ('smart-contracts-intro', 'Introduction to Smart Contracts', 'Discover how smart contracts power Web3 applications.', '<h1>Smart Contracts 101</h1><p>Hands-on introduction to smart contracts...</p>', '25 min', 'Intermediate', 3)
ON CONFLICT (slug) DO NOTHING;

-- Insert placeholder quiz data
INSERT INTO quizzes (title, description, questions, passing_score) VALUES
  ('Web3 Basics Quiz', 'Test your knowledge of Web3 fundamentals.', '[{"question": "What is a wallet?", "options": ["A physical wallet", "A digital storage for crypto", "A bank account", "A website"], "correct": 1}, {"question": "What does decentralized mean?", "options": ["Controlled by one company", "No single point of control", "Very expensive", "Only for experts"], "correct": 1}]', 70),
  ('Blockchain Fundamentals', 'Quiz on blockchain technology basics.', '[{"question": "What is a blockchain?", "options": ["A type of computer", "A distributed ledger", "A cryptocurrency", "A wallet"], "correct": 1}]', 70)
ON CONFLICT DO NOTHING;