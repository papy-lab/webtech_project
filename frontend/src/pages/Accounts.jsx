import { useState } from 'react';
import { FiPlus, FiCreditCard, FiDollarSign, FiCalendar, FiTrendingUp } from 'react-icons/fi';
import toast from 'react-hot-toast';
import DashboardLayout from '../components/DashboardLayout';
import { useTheme } from '../contexts/ThemeContext';

const Accounts = () => {
  const { isDarkMode } = useTheme();
  // Mock data
  const [accounts, setAccounts] = useState(window.mockAccounts || [
    { accountId: 1, accountType: 'SAVINGS', balance: 15000.00, createdAt: '2024-01-15', interestRate: 2.5, lastTransaction: '2024-03-10' },
    { accountId: 2, accountType: 'CHECKING', balance: 8500.00, createdAt: '2024-02-01', interestRate: 0.5, lastTransaction: '2024-03-09' },
    { accountId: 3, accountType: 'SAVINGS', balance: 1500.00, createdAt: '2024-03-01', interestRate: 2.5, lastTransaction: '2024-03-08' }
  ]);
  
  const [showNewAccountModal, setShowNewAccountModal] = useState(false);
  const [newAccount, setNewAccount] = useState({
    accountType: 'SAVINGS',
    initialDeposit: ''
  });

  const handleCreateAccount = (e) => {
    e.preventDefault();
    const accountId = accounts.length + 1;
    const newAccountData = {
      accountId,
      accountType: newAccount.accountType,
      balance: parseFloat(newAccount.initialDeposit),
      createdAt: new Date().toISOString().split('T')[0],
      interestRate: newAccount.accountType === 'SAVINGS' ? 2.5 : 0.5,
      lastTransaction: new Date().toISOString().split('T')[0]
    };
    
    setAccounts([...accounts, newAccountData]);
    setShowNewAccountModal(false);
    setNewAccount({ accountType: 'SAVINGS', initialDeposit: '' });
    toast.success('Account created successfully');
  };

  const handleDeleteAccount = (accountId) => {
    if (!window.confirm('Are you sure you want to close this account?')) return;
    setAccounts(accounts.filter(account => account.accountId !== accountId));
    toast.success('Account closed successfully');
  };

  const getTotalBalance = () => {
    return accounts.reduce((total, account) => total + account.balance, 0);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header with Total Balance */}
        <div className={`bg-gradient-to-r ${
          isDarkMode ? 'from-primary-900 to-primary-800' : 'from-primary-600 to-primary-700'
        } rounded-xl shadow-lg p-8 text-white transition-colors duration-300`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${isDarkMode ? 'text-primary-200' : 'text-primary-100'}`}>Total Balance</p>
              <h1 className="text-3xl font-bold mt-1">
                ${getTotalBalance().toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </h1>
            </div>
            <button
              onClick={() => setShowNewAccountModal(true)}
              className={`inline-flex items-center px-4 py-2 border border-white rounded-md text-sm font-medium text-white ${
                isDarkMode
                  ? 'hover:bg-primary-700'
                  : 'hover:bg-white hover:text-primary-600'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-600 focus:ring-white transition-colors`}
            >
              <FiPlus className="mr-2 -ml-1 h-5 w-5" />
              New Account
            </button>
          </div>
        </div>

        {/* Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <div key={account.accountId} className={`${
              isDarkMode
                ? 'bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-primary-900/10'
                : 'bg-white border-gray-100 hover:shadow-md'
            } rounded-xl shadow-sm p-6 border transition-all`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className={`p-3 rounded-full ${
                    account.accountType === 'SAVINGS'
                      ? isDarkMode ? 'bg-blue-900 text-blue-400' : 'bg-blue-50 text-blue-600'
                      : isDarkMode ? 'bg-green-900 text-green-400' : 'bg-green-50 text-green-600'
                  }`}>
                    <FiCreditCard className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className={`text-lg font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {account.accountType.charAt(0) + account.accountType.slice(1).toLowerCase()}
                    </h3>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>#{account.accountId}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteAccount(account.accountId)}
                  className={`text-red-600 hover:text-red-800 p-2 ${
                    isDarkMode ? 'hover:bg-red-900/50' : 'hover:bg-red-50'
                  } rounded-full transition-colors`}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className={`flex items-center ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <FiDollarSign className="h-5 w-5 mr-2" />
                  <div>
                    <p className="text-sm">Current Balance</p>
                    <p className={`text-xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>

                <div className={`flex items-center ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <FiTrendingUp className="h-5 w-5 mr-2" />
                  <div>
                    <p className="text-sm">Interest Rate</p>
                    <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {account.interestRate}%
                    </p>
                  </div>
                </div>

                <div className={`flex items-center ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <FiCalendar className="h-5 w-5 mr-2" />
                  <div>
                    <p className="text-sm">Last Transaction</p>
                    <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {account.lastTransaction}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`mt-6 pt-4 border-t ${
                isDarkMode ? 'border-gray-700' : 'border-gray-100'
              }`}>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Opened on {new Date(account.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* New Account Modal */}
        {showNewAccountModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className={`${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } rounded-xl max-w-md w-full p-6 transition-colors duration-300`}>
              <h2 className={`text-xl font-semibold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Open New Account</h2>
              <form onSubmit={handleCreateAccount} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  } mb-1`}>
                    Account Type
                  </label>
                  <select
                    value={newAccount.accountType}
                    onChange={(e) => setNewAccount({ ...newAccount, accountType: e.target.value })}
                    className={`block w-full rounded-md shadow-sm ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-200'
                        : 'border-gray-300 text-gray-900'
                    } focus:border-primary-500 focus:ring-primary-500 transition-colors duration-300`}
                  >
                    <option value="SAVINGS">Savings</option>
                    <option value="CHECKING">Checking</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  } mb-1`}>
                    Initial Deposit
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={newAccount.initialDeposit}
                    onChange={(e) => setNewAccount({ ...newAccount, initialDeposit: e.target.value })}
                    className={`block w-full rounded-md shadow-sm ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-200'
                        : 'border-gray-300 text-gray-900'
                    } focus:border-primary-500 focus:ring-primary-500 transition-colors duration-300`}
                    placeholder="Enter initial deposit amount"
                  />
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowNewAccountModal(false)}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      isDarkMode
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    } transition-colors duration-300`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 text-sm font-medium rounded-md text-white ${
                      isDarkMode
                        ? 'bg-primary-500 hover:bg-primary-400'
                        : 'bg-primary-600 hover:bg-primary-700'
                    } transition-colors duration-300`}
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Accounts; 