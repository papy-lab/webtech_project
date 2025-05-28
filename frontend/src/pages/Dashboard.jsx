import { FiDollarSign, FiCreditCard, FiActivity, FiArrowUp, FiArrowDown, FiRefreshCcw } from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';
import { useTheme } from '../contexts/ThemeContext';

const Dashboard = () => {
  const { isDarkMode } = useTheme();
  // Mock data
  const overviewData = {
    totalBalance: 25000.00,
    activeAccounts: 3,
    totalTransactions: 150,
    monthlyIncome: 5000.00,
    monthlyExpenses: 3500.00,
    recentTransactions: [
      { id: 1, type: 'DEPOSIT', amount: 1000, date: '2024-03-10', status: 'Completed', description: 'Salary Deposit' },
      { id: 2, type: 'WITHDRAWAL', amount: 500, date: '2024-03-09', status: 'Completed', description: 'ATM Withdrawal' },
      { id: 3, type: 'TRANSFER', amount: 750, date: '2024-03-08', status: 'Completed', description: 'Rent Payment' },
      { id: 4, type: 'DEPOSIT', amount: 250, date: '2024-03-07', status: 'Completed', description: 'Refund' },
      { id: 5, type: 'WITHDRAWAL', amount: 100, date: '2024-03-06', status: 'Completed', description: 'Grocery Shopping' }
    ]
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className={`bg-gradient-to-r ${
          isDarkMode
            ? 'from-primary-900 to-primary-800'
            : 'from-primary-600 to-primary-700'
        } rounded-xl shadow-lg p-6 text-white transition-colors duration-300`}>
          <h1 className="text-2xl font-bold mb-2">Welcome Back!</h1>
          <p className={isDarkMode ? 'text-primary-200' : 'text-primary-100'}>
            Here's your financial overview for today
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className={`${
            isDarkMode
              ? 'bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-primary-900/10'
              : 'bg-white border-gray-100 hover:shadow-md'
          } rounded-xl shadow-sm p-6 border transition-all`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-full ${
                isDarkMode ? 'bg-primary-900 text-primary-400' : 'bg-primary-50 text-primary-600'
              }`}>
                <FiDollarSign className="h-6 w-6" />
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                isDarkMode ? 'bg-primary-900 text-primary-400' : 'bg-primary-50 text-primary-600'
              }`}>
                Total Balance
              </span>
            </div>
            <h3 className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              ${overviewData.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </h3>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            } mt-1`}>Across all accounts</p>
          </div>

          <div className={`${
            isDarkMode
              ? 'bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-primary-900/10'
              : 'bg-white border-gray-100 hover:shadow-md'
          } rounded-xl shadow-sm p-6 border transition-all`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-full ${
                isDarkMode ? 'bg-green-900 text-green-400' : 'bg-green-50 text-green-600'
              }`}>
                <FiArrowUp className="h-6 w-6" />
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                isDarkMode ? 'bg-green-900 text-green-400' : 'bg-green-50 text-green-600'
              }`}>
                Monthly Income
              </span>
            </div>
            <h3 className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              ${overviewData.monthlyIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </h3>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            } mt-1`}>This month</p>
          </div>

          <div className={`${
            isDarkMode
              ? 'bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-primary-900/10'
              : 'bg-white border-gray-100 hover:shadow-md'
          } rounded-xl shadow-sm p-6 border transition-all`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-full ${
                isDarkMode ? 'bg-red-900 text-red-400' : 'bg-red-50 text-red-600'
              }`}>
                <FiArrowDown className="h-6 w-6" />
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                isDarkMode ? 'bg-red-900 text-red-400' : 'bg-red-50 text-red-600'
              }`}>
                Monthly Expenses
              </span>
            </div>
            <h3 className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              ${overviewData.monthlyExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </h3>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            } mt-1`}>This month</p>
          </div>

          <div className={`${
            isDarkMode
              ? 'bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-primary-900/10'
              : 'bg-white border-gray-100 hover:shadow-md'
          } rounded-xl shadow-sm p-6 border transition-all`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-full ${
                isDarkMode ? 'bg-blue-900 text-blue-400' : 'bg-blue-50 text-blue-600'
              }`}>
                <FiCreditCard className="h-6 w-6" />
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                isDarkMode ? 'bg-blue-900 text-blue-400' : 'bg-blue-50 text-blue-600'
              }`}>
                Active Accounts
              </span>
            </div>
            <h3 className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>{overviewData.activeAccounts}</h3>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            } mt-1`}>Savings & Checking</p>
          </div>

          <div className={`${
            isDarkMode
              ? 'bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-primary-900/10'
              : 'bg-white border-gray-100 hover:shadow-md'
          } rounded-xl shadow-sm p-6 border transition-all`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-full ${
                isDarkMode ? 'bg-purple-900 text-purple-400' : 'bg-purple-50 text-purple-600'
              }`}>
                <FiActivity className="h-6 w-6" />
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                isDarkMode ? 'bg-purple-900 text-purple-400' : 'bg-purple-50 text-purple-600'
              }`}>
                Transactions
              </span>
            </div>
            <h3 className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>{overviewData.totalTransactions}</h3>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            } mt-1`}>Last 30 days</p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className={`${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-xl shadow-sm border ${
          isDarkMode ? 'border-gray-700' : 'border-gray-100'
        } transition-colors duration-300`}>
          <div className={`px-6 py-4 border-b ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          } flex justify-between items-center`}>
            <h2 className={`text-lg font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Recent Transactions</h2>
            <button className={`${
              isDarkMode ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'
            } flex items-center text-sm font-medium transition-colors duration-300`}>
              <FiRefreshCcw className="w-4 h-4 mr-1" />
              Refresh
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                  } uppercase tracking-wider`}>Date</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                  } uppercase tracking-wider`}>Type</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                  } uppercase tracking-wider`}>Description</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                  } uppercase tracking-wider`}>Amount</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                  } uppercase tracking-wider`}>Status</th>
                </tr>
              </thead>
              <tbody className={`${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {overviewData.recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className={
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}>{transaction.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.type === 'DEPOSIT'
                          ? isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                          : transaction.type === 'WITHDRAWAL'
                            ? isDarkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'
                            : isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}>{transaction.description}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-900'
                    }`}>
                      ${transaction.amount.toFixed(2)}
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard; 