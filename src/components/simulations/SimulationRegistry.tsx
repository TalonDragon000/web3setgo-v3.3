import React from 'react';
import WalletCreationSimulation from './WalletCreationSimulation';

interface SimulationComponentProps {
  onComplete: () => void;
}

type SimulationComponent = React.FC<SimulationComponentProps>;

interface SimulationTypeEntry {
  componentType: string;
  component: SimulationComponent;
  displayName: string;
}

export interface SimulationStepMetadata {
  step_order: number;
  title: string;
  description: string;
  hints: string[];
}

// Registry maps component_type to React components
const componentTypeRegistry: Record<string, SimulationTypeEntry> = {
  'wallet-creation': {
    componentType: 'wallet-creation',
    component: WalletCreationSimulation,
    displayName: 'Wallet Creation Simulation',
  },
  // Add more simulation types here as they're developed
  // 'nft-minting': {
  //   componentType: 'nft-minting',
  //   component: NftMintingSimulation,
  //   displayName: 'NFT Minting Simulation',
  // },
};

// Get component by component_type field from database
export const getSimulationComponentByType = (componentType: string): SimulationComponent | null => {
  const entry = componentTypeRegistry[componentType];
  return entry ? entry.component : null;
};

// For backward compatibility with slug-based lookups
export const getSimulationComponent = (slug: string): SimulationComponent | null => {
  // This is deprecated but kept for compatibility
  // The slug 'create-your-first-wallet' maps to component_type 'wallet-creation'
  if (slug === 'create-your-first-wallet') {
    return getSimulationComponentByType('wallet-creation');
  }
  return null;
};

export const isSimulationImplemented = (componentType: string): boolean => {
  return componentType in componentTypeRegistry;
};

export const getRegisteredSimulationTypes = (): SimulationTypeEntry[] => {
  return Object.values(componentTypeRegistry);
};

// Step metadata registry - contains step instructions for the sidebar
const stepMetadataRegistry: Record<string, SimulationStepMetadata[]> = {
  'wallet-creation': [
    {
      step_order: 0,
      title: 'Welcome',
      description: 'Get ready to create your first Web3 wallet! This simulation will guide you through the entire process safely.',
      hints: ['This is a practice environment with fake data', 'Take your time to understand each step']
    },
    {
      step_order: 1,
      title: 'Generate Your Wallet',
      description: 'Click the button to generate your wallet. Behind the scenes, cryptographic algorithms will create your private key, public key, and wallet address.',
      hints: ['The generation process uses secure random number generation', 'In real wallets, this happens instantly']
    },
    {
      step_order: 2,
      title: 'Backup Your Seed Phrase',
      description: 'Write down your 12-word seed phrase on paper. This is the MOST important step! Anyone with this phrase can access your wallet.',
      hints: ['Never store your seed phrase digitally', 'Write it down clearly and keep it secure', 'You can click the eye icon to reveal the words']
    },
    {
      step_order: 3,
      title: 'Verify Your Seed Phrase',
      description: 'Select the correct words to verify you wrote down your seed phrase correctly. This ensures you can recover your wallet if needed.',
      hints: ['Double-check your written seed phrase', 'The correct words must match exactly', 'This step prevents mistakes that could lock you out']
    },
    {
      step_order: 4,
      title: 'Your Wallet Address',
      description: 'Your wallet address is ready! This is like your account number - you can share it to receive funds. Copy it and see the shortened format.',
      hints: ['Public addresses are safe to share', 'Never share your private key or seed phrase', 'The shortened format is easier to display']
    },
    {
      step_order: 5,
      title: 'Security Best Practices',
      description: 'Learn the essential security rules for protecting your wallet. Understanding these principles will keep your assets safe.',
      hints: ['Security is YOUR responsibility in Web3', 'No one can reset your password', 'Always verify addresses before sending']
    },
    {
      step_order: 6,
      title: 'Completion',
      description: 'Congratulations! You have successfully completed the wallet creation simulation and learned the fundamentals of Web3 wallet security.',
      hints: ['Practice makes perfect - try again if needed', 'Apply these lessons when creating a real wallet']
    }
  ],
  // Add more simulation step metadata here as new simulations are developed
  // 'nft-minting': [
  //   { step_order: 0, title: 'Welcome to NFT Minting', description: '...', hints: ['...'] },
  //   ...
  // ],
};

// Get step metadata for a given component type
export const getSimulationStepMetadata = (componentType: string): SimulationStepMetadata[] => {
  return stepMetadataRegistry[componentType] || [];
};

// Get total step count for a simulation
export const getSimulationStepCount = (componentType: string): number => {
  const steps = stepMetadataRegistry[componentType];
  return steps ? steps.length : 0;
};

export default componentTypeRegistry;
