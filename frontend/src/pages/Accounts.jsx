import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import DashboardLayout from '../components/DashboardLayout';

const Accounts = () => {
  // Mock data
  const [accounts, setAccounts] = useState([
    { accountId: 1, accountType: 'SAVINGS', balance: 15000.00, createdAt: '2024-01-15' },
    { accountId: 2, accountType: 'CHECKING', balance: 8500.00, createdAt: '2024-02-01' },
    { accountId: 3, accountType: 'SAVINGS', balance: 1500.00, createdAt: '2024-03-01' }
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
      createdAt: new Date().toISOString().split('T')[0]
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">My Accounts</h1>
          <button
            onClick={() => setShowNewAccountModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <FiPlus className="mr-2 -ml-1 h-5 w-5" />
            New Account
          </button>
        </div>

        {/* Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <div key={account.accountId} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {account.accountType.charAt(0) + account.accountType.slice(1).toLowerCase()} Account
                  </h3>
                  <p className="text-sm text-gray-500">#{account.accountId}</p>
                </div>
                <button
                  onClick={() => handleDeleteAccount(account.accountId)}
                  className="text-red-600 hover:text-red-800"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Current Balance</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${account.balance.toFixed(2)}
                </p>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Created At</p>
                <p className="text-sm text-gray-900">
                  {account.createdAt}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* New Account Modal */}
        {showNewAccountModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h2 className="text-xl font-semibold mb-4">Open New Account</h2>
              <form onSubmit={handleCreateAccount}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Account Type
                    </label>
                    <select
                      value={newAccount.accountType}
                      onChange={(e) => setNewAccount({ ...newAccount, accountType: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                      <option value="SAVINGS">Savings</option>
                      <option value="CHECKING">Checking</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Initial Deposit
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={newAccount.initialDeposit}
                        onChange={(e) => setNewAccount({ ...newAccount, initialDeposit: e.target.value })}
                        className="block w-full pl-7 pr-12 border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowNewAccountModal(false)}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
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