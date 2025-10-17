import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WalletData {
  address: string;
  privateKey: string;
  seedPhrase: string[];
  balance: string;
}

interface SimulationState {
  currentStep: number;
  walletData: WalletData | null;
  userActions: string[];
  hintsViewed: number[];
}

interface SimulationContextType {
  state: SimulationState;
  setCurrentStep: (step: number) => void;
  setWalletData: (data: WalletData) => void;
  addUserAction: (action: string) => void;
  addHintViewed: (stepIndex: number) => void;
  resetSimulation: () => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

const initialState: SimulationState = {
  currentStep: 0,
  walletData: null,
  userActions: [],
  hintsViewed: [],
};

export const SimulationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<SimulationState>(initialState);

  const setCurrentStep = (step: number) => {
    setState(prev => ({ ...prev, currentStep: step }));
  };

  const setWalletData = (data: WalletData) => {
    setState(prev => ({ ...prev, walletData: data }));
  };

  const addUserAction = (action: string) => {
    setState(prev => ({ ...prev, userActions: [...prev.userActions, action] }));
  };

  const addHintViewed = (stepIndex: number) => {
    setState(prev => {
      if (prev.hintsViewed.includes(stepIndex)) return prev;
      return { ...prev, hintsViewed: [...prev.hintsViewed, stepIndex] };
    });
  };

  const resetSimulation = () => {
    setState(initialState);
  };

  return (
    <SimulationContext.Provider
      value={{
        state,
        setCurrentStep,
        setWalletData,
        addUserAction,
        addHintViewed,
        resetSimulation,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulationContext = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulationContext must be used within SimulationProvider');
  }
  return context;
};
