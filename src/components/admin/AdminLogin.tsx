import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

interface AdminLoginProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAdmin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login(password);

    if (success) {
      setPassword('');
      onSuccess?.();
      onClose();
    } else {
      setError('Invalid password. Please try again.');
      setPassword('');
    }

    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        <div className="flex items-center justify-center mb-6">
          <div className="p-3 bg-ocean-100 rounded-full">
            <Lock className="h-8 w-8 text-ocean-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Admin Access Required
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Please enter the admin password to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
              placeholder="Enter admin password"
              autoFocus
              disabled={isLoading}
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full px-6 py-3 bg-gradient-to-r from-mint-500 to-ocean-500 text-white font-semibold rounded-lg hover:from-mint-600 hover:to-ocean-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Verifying...' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-xs text-gray-500 text-center">
          This is a password-protected admin area. Contact the site administrator if you need access.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
