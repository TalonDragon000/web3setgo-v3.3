-- Drop simulation_steps table and related objects
-- This migration removes the simulation_steps table as simulations are now fully self-contained

-- Drop RLS policies first
DROP POLICY IF EXISTS "Allow public read access to simulation_steps" ON simulation_steps;
DROP POLICY IF EXISTS "Allow public insert to simulation_steps" ON simulation_steps;
DROP POLICY IF EXISTS "Allow public update to simulation_steps" ON simulation_steps;
DROP POLICY IF EXISTS "Allow public delete from simulation_steps" ON simulation_steps;

-- Drop indexes
DROP INDEX IF EXISTS simulation_steps_simulation_id_idx;

-- Drop the table
DROP TABLE IF EXISTS simulation_steps;

-- Note: Keep the simulations table unchanged as it stores metadata

