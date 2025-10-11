import React, { useState, useEffect } from 'react';
import { Check, Copy, Eye, EyeOff, Loader2, Sparkles } from 'lucide-react';
import { useSimulationContext } from '../../contexts/SimulationContext';
import {
  generateMockSeedPhrase,
  generateMockAddress,
  shortenAddress,
  formatMockBalance,
} from '../../utils/walletGenerator';

interface WalletCreationSimulationProps {
  currentStep: number;
  onStepComplete: (nextStep: number) => void;
}

const WalletCreationSimulation: React.FC<WalletCreationSimulationProps> = ({
  currentStep,
  onStepComplete,
}) => {
  const { state, setWalletData } = useSimulationContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState<string[]>([]);
  const [address, setAddress] = useState('');
  const [showSeedPhrase, setShowSeedPhrase] = useState(false);
  const [verificationWords, setVerificationWords] = useState<number[]>([]);
  const [selectedWords, setSelectedWords] = useState<{ [key: number]: string }>({});
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);

  useEffect(() => {
    if (currentStep === 3 && seedPhrase.length > 0) {
      const randomIndices = [2, 6, 10];
      setVerificationWords(randomIndices);

      const allWords = [...seedPhrase];
      const shuffled = allWords.sort(() => Math.random() - 0.5);
      setShuffledOptions(shuffled);
    }
  }, [currentStep, seedPhrase]);

  const handleWelcome = () => {
    onStepComplete(currentStep + 1);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockSeedPhrase = generateMockSeedPhrase();
    const mockAddress = generateMockAddress();
    const mockBalance = formatMockBalance();

    setSeedPhrase(mockSeedPhrase);
    setAddress(mockAddress);

    setWalletData({
      address: mockAddress,
      privateKey: '',
      seedPhrase: mockSeedPhrase,
      balance: mockBalance,
    });

    setIsGenerating(false);
    onStepComplete(currentStep + 1);
  };

  const handleBackupConfirm = () => {
    setShowSeedPhrase(true);
    onStepComplete(currentStep + 1);
  };

  const handleWordSelect = (index: number, word: string) => {
    setSelectedWords(prev => ({ ...prev, [index]: word }));
  };

  const handleVerify = () => {
    const isCorrect = verificationWords.every(
      index => selectedWords[index] === seedPhrase[index]
    );

    if (isCorrect) {
      setVerificationComplete(true);
      setTimeout(() => {
        onStepComplete(currentStep + 1);
      }, 1000);
    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onStepComplete(currentStep + 1);
    }, 1000);
  };

  const handleSecurityComplete = () => {
    onStepComplete(currentStep + 1);
  };

  const handleFinalComplete = () => {
    onStepComplete(currentStep + 1);
  };

  if (currentStep === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-mint-100 to-ocean-100 rounded-full mb-6">
            <Sparkles className="h-10 w-10 text-ocean-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Create Your First Wallet?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            This interactive simulation will guide you through every step of creating a Web3 wallet safely.
          </p>
          <div className="bg-blue-50 border-l-4 border-ocean-500 p-4 rounded-r-lg text-left max-w-lg mx-auto mb-8">
            <p className="text-sm text-gray-700">
              <strong className="font-semibold">Remember:</strong> This is a practice simulation with fake data.
              When you create a real wallet, you'll follow similar steps but with real security implications!
            </p>
          </div>
        </div>
        <button
          onClick={handleWelcome}
          className="w-full py-4 bg-gradient-to-r from-mint-500 to-ocean-500 text-white font-semibold rounded-xl hover:from-mint-600 hover:to-ocean-600 transition-all duration-200"
        >
          Let's Begin!
        </button>
      </div>
    );
  }

  if (currentStep === 1) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Generating Your Wallet
          </h2>
          {!isGenerating && !address && (
            <>
              <p className="text-lg text-gray-600 mb-8">
                Behind the scenes, we'll create:
              </p>
              <div className="space-y-4 mb-8 text-left max-w-md mx-auto">
                <div className="flex items-start p-4 bg-slate-50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-ocean-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Private Key</h3>
                    <p className="text-sm text-gray-600">Your secret password (never share!)</p>
                  </div>
                </div>
                <div className="flex items-start p-4 bg-slate-50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-ocean-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Public Key</h3>
                    <p className="text-sm text-gray-600">Derived from your private key</p>
                  </div>
                </div>
                <div className="flex items-start p-4 bg-slate-50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-ocean-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Wallet Address</h3>
                    <p className="text-sm text-gray-600">Your public account number (safe to share)</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-4 bg-gradient-to-r from-mint-500 to-ocean-500 text-white font-semibold rounded-xl hover:from-mint-600 hover:to-ocean-600 transition-all duration-200 disabled:opacity-50"
              >
                Generate My Wallet
              </button>
            </>
          )}
          {isGenerating && (
            <div className="py-12">
              <Loader2 className="h-16 w-16 text-ocean-500 animate-spin mx-auto mb-4" />
              <p className="text-lg text-gray-600">Generating your wallet...</p>
              <p className="text-sm text-gray-500 mt-2">Using cryptographic algorithms</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Your Secret Recovery Phrase
        </h2>

        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-6">
          <p className="text-sm text-red-800 font-semibold mb-2">
            CRITICAL: This is the MOST important step!
          </p>
          <p className="text-sm text-red-700">
            Your seed phrase can restore your wallet on any device. Anyone with this phrase controls your funds.
            Never share it, never store it digitally!
          </p>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Your 12-Word Seed Phrase</h3>
            <button
              onClick={() => setShowSeedPhrase(!showSeedPhrase)}
              className="flex items-center text-sm text-ocean-600 hover:text-ocean-700"
            >
              {showSeedPhrase ? (
                <>
                  <EyeOff className="h-4 w-4 mr-1" />
                  Hide
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-1" />
                  Show
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {seedPhrase.map((word, index) => (
              <div
                key={index}
                className="p-3 bg-slate-50 rounded-lg border border-gray-200"
              >
                <span className="text-xs text-gray-500 mr-2">{index + 1}.</span>
                <span className="font-mono font-semibold text-gray-900">
                  {showSeedPhrase ? word : '••••••'}
                </span>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-600 mb-6 text-center">
            Write these words down on paper in order. Do NOT screenshot or store digitally!
          </p>
        </div>

        <button
          onClick={handleBackupConfirm}
          className="w-full py-4 bg-gradient-to-r from-mint-500 to-ocean-500 text-white font-semibold rounded-xl hover:from-mint-600 hover:to-ocean-600 transition-all duration-200"
        >
          I've Written It Down
        </button>
      </div>
    );
  }

  if (currentStep === 3) {
    const allSelected = verificationWords.every(index => selectedWords[index]);
    const canVerify = allSelected;

    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Verify Your Seed Phrase
        </h2>

        <p className="text-center text-gray-600 mb-8">
          Select the correct words for positions #{verificationWords.map(i => i + 1).join(', #')}
        </p>

        <div className="space-y-6 mb-8">
          {verificationWords.map((wordIndex) => (
            <div key={wordIndex}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Word #{wordIndex + 1}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {shuffledOptions.slice(0, 6).map((word, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleWordSelect(wordIndex, word)}
                    className={`p-3 rounded-lg border-2 font-mono text-sm transition-all duration-200 ${
                      selectedWords[wordIndex] === word
                        ? 'border-ocean-500 bg-ocean-50 text-ocean-700'
                        : 'border-gray-200 hover:border-ocean-300 bg-white'
                    }`}
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {verificationComplete ? (
          <div className="bg-success-50 border-l-4 border-success-500 p-4 rounded-r-lg mb-4">
            <div className="flex items-center">
              <Check className="h-5 w-5 text-success-600 mr-2" />
              <p className="text-sm text-success-800 font-semibold">
                Perfect! Your seed phrase is verified.
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={handleVerify}
            disabled={!canVerify}
            className="w-full py-4 bg-gradient-to-r from-mint-500 to-ocean-500 text-white font-semibold rounded-xl hover:from-mint-600 hover:to-ocean-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Verify Seed Phrase
          </button>
        )}
      </div>
    );
  }

  if (currentStep === 4) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-success-100 to-mint-100 rounded-full mb-6">
            <Check className="h-8 w-8 text-success-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your Wallet is Ready!
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Here's your wallet address you can share this to receive funds.
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Wallet Address
          </label>
          <div className="flex items-center space-x-2">
            <div className="flex-1 p-4 bg-white rounded-lg border border-gray-300 font-mono text-sm break-all">
              {address}
            </div>
            <button
              onClick={handleCopyAddress}
              className="flex-shrink-0 p-4 bg-ocean-500 text-white rounded-lg hover:bg-ocean-600 transition-colors duration-200"
            >
              {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Shortened: {shortenAddress(address)}
          </p>
        </div>

        <div className="bg-blue-50 border-l-4 border-ocean-500 p-4 rounded-r-lg mb-6">
          <h4 className="font-semibold text-ocean-900 mb-2">Key Differences:</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <Check className="h-4 w-4 text-success-600 mr-2 mt-0.5 flex-shrink-0" />
              <span><strong>Public Address:</strong> Safe to share (like your email)</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2">⚠️</span>
              <span><strong>Private Key:</strong> NEVER share (like your password)</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2">⚠️</span>
              <span><strong>Seed Phrase:</strong> NEVER share (like your master password)</span>
            </li>
          </ul>
        </div>

        {copied && (
          <button
            onClick={() => onStepComplete(currentStep + 1)}
            className="w-full py-4 bg-gradient-to-r from-mint-500 to-ocean-500 text-white font-semibold rounded-xl hover:from-mint-600 hover:to-ocean-600 transition-all duration-200"
          >
            Continue
          </button>
        )}
      </div>
    );
  }

  if (currentStep === 5) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Security Best Practices
        </h2>

        <div className="space-y-4 mb-8">
          <div className="border-l-4 border-success-500 bg-success-50 p-4 rounded-r-lg">
            <h3 className="font-semibold text-success-900 mb-2 flex items-center">
              <Check className="h-5 w-5 mr-2" />
              Do These Things
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 ml-7">
              <li>✓ Write down your seed phrase on paper</li>
              <li>✓ Store it in multiple secure locations</li>
              <li>✓ Use a hardware wallet for large amounts</li>
              <li>✓ Enable 2FA where available</li>
              <li>✓ Double-check addresses before sending</li>
            </ul>
          </div>

          <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
            <h3 className="font-semibold text-red-900 mb-2 flex items-center">
              <span className="mr-2">⚠️</span>
              Never Do These Things
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 ml-7">
              <li>✗ Share your seed phrase or private key</li>
              <li>✗ Store seed phrase digitally or in cloud</li>
              <li>✗ Trust unsolicited messages asking for keys</li>
              <li>✗ Click suspicious links</li>
              <li>✗ Rush transactions without verifying</li>
            </ul>
          </div>
        </div>

        <button
          onClick={handleSecurityComplete}
          className="w-full py-4 bg-gradient-to-r from-mint-500 to-ocean-500 text-white font-semibold rounded-xl hover:from-mint-600 hover:to-ocean-600 transition-all duration-200"
        >
          I Understand
        </button>
      </div>
    );
  }

  if (currentStep === 6) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-success-100 to-mint-100 rounded-full mb-6">
            <Sparkles className="h-10 w-10 text-success-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Congratulations!
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            You've successfully completed the wallet creation simulation!
          </p>

          <div className="bg-gradient-to-r from-mint-50 to-ocean-50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4 text-lg">What You Learned:</h3>
            <div className="grid md:grid-cols-2 gap-3 text-left">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-success-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">How Web3 wallets are generated</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-success-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">The importance of seed phrases</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-success-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Public vs private keys</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-success-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Security best practices</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-ocean-500 p-4 rounded-r-lg mb-8">
            <p className="text-sm text-gray-700">
              <strong className="font-semibold">Remember:</strong> This was a simulation. When creating a real wallet,
              the stakes are real. Always prioritize security and never share your private keys!
            </p>
          </div>

          <button
            onClick={handleFinalComplete}
            className="w-full py-4 bg-gradient-to-r from-mint-500 to-ocean-500 text-white font-semibold rounded-xl hover:from-mint-600 hover:to-ocean-600 transition-all duration-200"
          >
            Complete Simulation
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default WalletCreationSimulation;
