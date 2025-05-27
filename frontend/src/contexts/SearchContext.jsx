import { createContext, useContext, useState } from 'react';

const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({
    accounts: [],
    transactions: [],
    loans: []
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults({ accounts: [], transactions: [], loans: [] });
      return;
    }

    // Search in accounts
    const filteredAccounts = window.mockAccounts?.filter(account =>
      account.accountType.toLowerCase().includes(query.toLowerCase()) ||
      account.accountId.toString().includes(query)
    ) || [];

    // Search in transactions
    const filteredTransactions = window.mockTransactions?.filter(transaction =>
      transaction.transactionType.toLowerCase().includes(query.toLowerCase()) ||
      transaction.amount.toString().includes(query) ||
      transaction.accountId.toString().includes(query)
    ) || [];

    // Search in loans
    const filteredLoans = window.mockLoans?.filter(loan =>
      loan.purpose.toLowerCase().includes(query.toLowerCase()) ||
      loan.amount.toString().includes(query) ||
      loan.status.toLowerCase().includes(query.toLowerCase())
    ) || [];

    setSearchResults({
      accounts: filteredAccounts,
      transactions: filteredTransactions,
      loans: filteredLoans
    });
  };

  return (
    <SearchContext.Provider value={{ searchQuery, searchResults, handleSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}; 