/*
  # Seed Wallet Creation Simulation
  
  Create database entry for the existing wallet creation simulation.
  This includes the simulation metadata and all steps.
*/

-- Insert wallet creation simulation
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

-- Get the simulation ID for inserting steps
DO $$
DECLARE
  sim_id uuid;
BEGIN
  SELECT id INTO sim_id FROM simulations WHERE slug = 'create-your-first-wallet';
  
  IF sim_id IS NOT NULL THEN
    -- Insert simulation steps
    INSERT INTO simulation_steps (simulation_id, step_order, title, description, hints) VALUES
    (sim_id, 0, 'Welcome', 'Get ready to create your first wallet. This simulation will guide you through every step safely.', '["This is a practice environment with fake data", "Take your time to understand each step"]'),
    (sim_id, 1, 'Generate Wallet', 'Learn how wallets are created using cryptographic algorithms to generate your keys and address.', '["A wallet consists of a private key, public key, and address", "The generation process is secure and random"]'),
    (sim_id, 2, 'Backup Seed Phrase', 'Your seed phrase is the master key to your wallet. Write it down and keep it safe!', '["Never share your seed phrase with anyone", "Store it offline in a secure location", "This is the MOST important security step"]'),
    (sim_id, 3, 'Verify Seed Phrase', 'Confirm you have correctly recorded your seed phrase by selecting the right words.', '["Double-check your written seed phrase", "The order of words matters", "This prevents future access issues"]'),
    (sim_id, 4, 'Your Wallet Address', 'Your public wallet address is like your account number - safe to share for receiving funds.', '["Share this address to receive crypto", "Keep your private key and seed phrase secret", "Your address starts with 0x"]'),
    (sim_id, 5, 'Security Best Practices', 'Learn essential security practices to protect your wallet and assets.', '["Use hardware wallets for large amounts", "Enable 2FA where available", "Verify addresses before sending"]'),
    (sim_id, 6, 'Completion', 'Congratulations! You have successfully learned how to create a wallet.', '["Practice makes perfect", "Now you understand the basics", "You are ready to explore Web3"]')
    ON CONFLICT DO NOTHING;
  END IF;
END $$;

