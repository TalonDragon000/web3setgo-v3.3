import React from 'react';
import WalletCreationSimulation from './WalletCreationSimulation';

interface SimulationComponentProps {
  currentStep: number;
  onStepComplete: (nextStep: number) => void;
}

type SimulationComponent = React.FC<SimulationComponentProps>;

interface SimulationRegistryEntry {
  slug: string;
  component: SimulationComponent;
  displayName: string;
}

const simulationRegistry: Record<string, SimulationRegistryEntry> = {
  'create-your-first-wallet': {
    slug: 'create-your-first-wallet',
    component: WalletCreationSimulation,
    displayName: 'Wallet Creation Simulation',
  },
};

export const getSimulationComponent = (slug: string): SimulationComponent | null => {
  const entry = simulationRegistry[slug];
  return entry ? entry.component : null;
};

export const isSimulationImplemented = (slug: string): boolean => {
  return slug in simulationRegistry;
};

export const getRegisteredSimulations = (): SimulationRegistryEntry[] => {
  return Object.values(simulationRegistry);
};

export default simulationRegistry;
