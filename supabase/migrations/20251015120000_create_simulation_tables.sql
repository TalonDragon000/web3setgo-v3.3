/*
  # Create Simulation Tables
  
  1. New Tables
    - `simulations`
      - `id` (uuid, primary key)
      - `slug` (text, unique) - URL-friendly identifier
      - `title` (text) - Simulation title
      - `description` (text) - Short description
      - `category` (text) - Simulation category (e.g., 'Wallets', 'DeFi')
      - `difficulty` (text) - Beginner/Intermediate/Advanced
      - `duration` (text) - Estimated duration
      - `component_type` (text) - Identifies which React component to load
      - `icon` (text) - Icon name reference
      - `color_scheme` (text) - Tailwind gradient classes
      - `order_index` (integer) - Display order
      - `published` (boolean) - Publication status
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `simulation_steps`
      - `id` (uuid, primary key)
      - `simulation_id` (uuid, foreign key) - Reference to simulation
      - `step_order` (integer) - Step sequence number
      - `title` (text) - Step title
      - `description` (text) - Step description (markdown)
      - `hints` (jsonb) - Array of hint strings
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (published only)
    - Allow anonymous write access (will be controlled client-side via admin context)
*/

-- Create simulations table
CREATE TABLE IF NOT EXISTS simulations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL DEFAULT 'General',
  difficulty text NOT NULL DEFAULT 'Beginner',
  duration text NOT NULL DEFAULT '15 min',
  component_type text NOT NULL DEFAULT 'generic',
  icon text NOT NULL DEFAULT 'Zap',
  color_scheme text NOT NULL DEFAULT 'from-mint-500 to-ocean-500',
  order_index integer NOT NULL DEFAULT 0,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create simulation_steps table
CREATE TABLE IF NOT EXISTS simulation_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  simulation_id uuid NOT NULL REFERENCES simulations(id) ON DELETE CASCADE,
  step_order integer NOT NULL DEFAULT 0,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  hints jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create index on simulation_id for faster queries
CREATE INDEX IF NOT EXISTS simulation_steps_simulation_id_idx ON simulation_steps(simulation_id);

-- Enable RLS
ALTER TABLE simulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulation_steps ENABLE ROW LEVEL SECURITY;

-- Policies for simulations (public read for published, anonymous write)
CREATE POLICY "Anyone can view published simulations"
  ON simulations FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Anyone can insert simulations"
  ON simulations FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update simulations"
  ON simulations FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete simulations"
  ON simulations FOR DELETE
  TO public
  USING (true);

-- Policies for simulation_steps (public read, anonymous write)
CREATE POLICY "Anyone can view simulation steps"
  ON simulation_steps FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert simulation steps"
  ON simulation_steps FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update simulation steps"
  ON simulation_steps FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete simulation steps"
  ON simulation_steps FOR DELETE
  TO public
  USING (true);

