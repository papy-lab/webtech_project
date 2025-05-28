import { useState } from 'react';
import { FiPlus, FiFilter } from 'react-icons/fi';
import toast from 'react-hot-toast';
import DashboardLayout from '../components/DashboardLayout';
import Pagination from '../components/Pagination';
import { useTheme } from '../contexts/ThemeContext';

const Transactions = () => {
  const { isDarkMode } = useTheme();
  // Mock data
  const [transactions, setTransactions] = useState(window.mockTransactions || []);
  const accounts = window.mockAccounts || [];

  const [showNewTransactionModal, setShowNewTransactionModal] = useState(false);
  const [filters, setFilters] = useState({
    accountId: '',
    type: '',
    startDate: '',
    endDate: ''
  });
  const [newTransaction, setNewTransaction] = useState({
    accountId: '',
    transactionType: 'DEPOSIT',
    amount: ''
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleCreateTransaction = (e) => {
    e.preventDefault();
    const transactionId = transactions.length + 1;
    const newTransactionData = {
      transactionId,
      date: new Date().toISOString().split('T')[0],
      ...newTransaction,
      amount: parseFloat(newTransaction.amount),
      status: 'Completed'
    };
    
    setTransactions([newTransactionData, ...transactions]);
    setShowNewTransactionModal(false);
    setNewTransaction({ accountId: '', transactionType: 'DEPOSIT', amount: '' });
    toast.success('Transaction completed successfully');
  };

  const handleFilter = () => {
    // Apply filters to transactions
    let filtered = [...window.mockTransactions];
    
    if (filters.accountId) {
      filtered = filtered.filter(t => t.accountId.toString() === filters.accountId);
    }
    if (filters.type) {
      filtered = filtered.filter(t => t.transactionType === filters.type);
    }
    if (filters.startDate) {
      filtered = filtered.filter(t => t.date >= filters.startDate);
    }
    if (filters.endDate) {
      filtered = filtered.filter(t => t.date <= filters.endDate);
    }
    
    setTransactions(filtered);
    setCurrentPage(1); // Reset to first page when filtering
    toast.success('Filters applied');
  };

  // Calculate pagination
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Transactions</h1>
          <button
            onClick={() => setShowNewTransactionModal(true)}
            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isDarkMode
                ? 'bg-primary-500 hover:bg-primary-400'
                : 'bg-primary-600 hover:bg-primary-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-300`}
          >
            <FiPlus className="mr-2 -ml-1 h-5 w-5" />
            New Transaction
          </button>
        </div>

        {/* Filters */}
        <div className={`${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow-sm p-6 transition-colors duration-300`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className={`block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>Account</label>
              <select
                value={filters.accountId}
                onChange={(e) => setFilters({ ...filters, accountId: e.target.value })}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-gray-200'
                    : 'border-gray-300 text-gray-900'
                } focus:border-primary-500 focus:ring-primary-500 transition-colors duration-300`}
              >
                <option value="">All Accounts</option>
                {accounts.map((account) => (
                  <option key={account.accountId} value={account.accountId}>
                    {account.accountType} - #{account.accountId}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>Type</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-gray-200'
                    : 'border-gray-300 text-gray-900'
                } focus:border-primary-500 focus:ring-primary-500 transition-colors duration-300`}
              >
                <option value="">All Types</option>
                <option value="DEPOSIT">Deposit</option>
                <option value="WITHDRAWAL">Withdrawal</option>
                <option value="TRANSFER">Transfer</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>Start Date</label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-gray-200'
                    : 'border-gray-300 text-gray-900'
                } focus:border-primary-500 focus:ring-primary-500 transition-colors duration-300`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>End Date</label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-gray-200'
                    : 'border-gray-300 text-gray-900'
                } focus:border-primary-500 focus:ring-primary-500 transition-colors duration-300`}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleFilter}
              className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${
                isDarkMode
                  ? 'bg-primary-500 text-white hover:bg-primary-400'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-300`}
            >
              <FiFilter className="mr-2 -ml-1 h-5 w-5" />
              Apply Filters
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className={`${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow-sm overflow-hidden transition-colors duration-300`}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                  } uppercase tracking-wider`}>
                    Date
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                  } uppercase tracking-wider`}>
                    Type
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                  } uppercase tracking-wider`}>
                    Amount
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                  } uppercase tracking-wider`}>
                    Account
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                  } uppercase tracking-wider`}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className={`${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {currentTransactions.map((transaction) => (
                  <tr key={transaction.transactionId} className={
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.transactionType === 'DEPOSIT'
                          ? isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                          : transaction.transactionType === 'WITHDRAWAL'
                            ? isDarkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'
                            : isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {transaction.transactionType}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-900'
                    }`}>
                      ${transaction.amount.toFixed(2)}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Account #{transaction.accountId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {currentTransactions.length === 0 && (
                  <tr>
                    <td colSpan="5" className={`px-6 py-4 text-center text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {transactions.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>

        {/* New Transaction Modal */}
        {showNewTransactionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className={`${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } rounded-lg max-w-md w-full p-6 transition-colors duration-300`}>
              <h2 className={`text-xl font-semibold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>New Transaction</h2>
              <form onSubmit={handleCreateTransaction}>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Account
                    </label>
                    <select
                      value={newTransaction.accountId}
                      onChange={(e) => setNewTransaction({ ...newTransaction, accountId: e.target.value })}
                      className={`mt-1 block w-full rounded-md shadow-sm ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-200'
                          : 'border-gray-300 text-gray-900'
                      } focus:border-primary-500 focus:ring-primary-500 transition-colors duration-300`}
                    >
                      <option value="">Select Account</option>
                      {accounts.map((account) => (
                        <option key={account.accountId} value={account.accountId}>
                          {account.accountType} - #{account.accountId} (${account.balance.toFixed(2)})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Transaction Type
                    </label>
                    <select
                      value={newTransaction.transactionType}
                      onChange={(e) => setNewTransaction({ ...newTransaction, transactionType: e.target.value })}
                      className={`mt-1 block w-full rounded-md shadow-sm ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-200'
                          : 'border-gray-300 text-gray-900'
                      } focus:border-primary-500 focus:ring-primary-500 transition-colors duration-300`}
                    >
                      <option value="DEPOSIT">Deposit</option>
                      <option value="WITHDRAWAL">Withdrawal</option>
                      <option value="TRANSFER">Transfer</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Amount
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                      className={`mt-1 block w-full rounded-md shadow-sm ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-200'
                          : 'border-gray-300 text-gray-900'
                      } focus:border-primary-500 focus:ring-primary-500 transition-colors duration-300`}
                      placeholder="Enter amount"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowNewTransactionModal(false)}
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
                      Create Transaction
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Transactions; 