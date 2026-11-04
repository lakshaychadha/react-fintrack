
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Overview from './pages/Overview'
import Transactions from './pages/Transactions'
import Budgets from './pages/Budgets'
import Investments from './pages/Investments'
import Settings from './pages/Settings'

const initialTransactions = [
  {
    id: 1,
    name: 'Amazon Shopping',
    category: 'Shopping',
    date: '2026-11-03',
    amount: 2499,
    type: 'expense',
  },
  {
    id: 2,
    name: 'Salary',
    category: 'Salary',
    date: '2026-11-02',
    amount: 45000,
    type: 'income',
  },
  {
    id: 3,
    name: 'Restaurant',
    category: 'Food',
    date: '2026-11-01',
    amount: 850,
    type: 'expense',
  },
  {
    id: 4,
    name: 'Uber Ride',
    category: 'Transport',
    date: '2026-10-31',
    amount: 350,
    type: 'expense',
  },
]

function App() {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('fintrack-transactions')

    return savedTransactions
      ? JSON.parse(savedTransactions)
      : initialTransactions
  })

  useEffect(() => {
    localStorage.setItem(
      'fintrack-transactions',
      JSON.stringify(transactions)
    )
  }, [transactions])

  function addTransaction(newTransaction) {
    setTransactions((previous) => [newTransaction, ...previous])
  }

  function deleteTransaction(id) {
    setTransactions((previous) =>
      previous.filter((transaction) => transaction.id !== id)
    )
  }

  function updateTransaction(updatedTransaction) {
    setTransactions((previous) =>
      previous.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      )
    )
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Overview
            transactions={transactions}
            addTransaction={addTransaction}
            deleteTransaction={deleteTransaction}
            updateTransaction={updateTransaction}
          />
        }
      />

      <Route
        path="/transactions"
        element={
          <Transactions
            transactions={transactions}
            deleteTransaction={deleteTransaction}
            updateTransaction={updateTransaction}
          />
        }
      />

     <Route path="/budgets" element={<Budgets transactions={transactions} />} />

      <Route path="/investments" element={<Investments />} />

      <Route path="/settings" element={<Settings />} />

      <Route
        path="*"
        element={
          <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-2xl">
            Page not found
          </div>
        }
      />
    </Routes>
  )
}

export default App
