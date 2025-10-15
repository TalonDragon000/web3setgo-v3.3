/*
  # Seed Wallet Creation Simulation
  
  Create database entry for the existing wallet creation simulation.
  This includes only the simulation metadata. All UI and step logic is now
  handled by the WalletCreationSimulation component itself.
*/

-- Insert wallet creation simulation metadata
INSERT INTO simulations (
  slug,
  title,
  description,
  category,
  difficulty,
  duration,
  component_type,
  icon,
  color_scheme,
  order_index,
  published
) VALUES (
  'create-your-first-wallet',
  'Create Your First Wallet',
  'Learn how to create a Web3 wallet step-by-step in a safe, simulated environment. No real crypto involved!',
  'Wallets',
  'Beginner',
  '10-15 min',
  'wallet-creation',
  'Wallet',
  'from-mint-500 to-ocean-500',
  1,
  true
) ON CONFLICT (slug) DO NOTHING;

