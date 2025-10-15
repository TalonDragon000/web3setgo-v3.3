import React from 'react';
import WalletCreationSimulation from './WalletCreationSimulation';

interface SimulationComponentProps {
  currentStep: number;
  onStepComplete: (nextStep: number) => void;
}

type SimulationComponent = React.FC<SimulationComponentProps>;

interface SimulationTypeEntry {
  componentType: string;
  component: SimulationComponent;
  displayName: string;
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

// Get list of available component types for the editor dropdown
export const getAvailableComponentTypes = (): Array<{ value: string; label: string }> => {
  return Object.values(componentTypeRegistry).map(entry => ({
    value: entry.componentType,
    label: entry.displayName,
  }));
};

export default componentTypeRegistry;
