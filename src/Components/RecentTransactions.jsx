
import { useState } from 'react'
import {
  ShoppingBag,
  Utensils,
  Car,
  Briefcase,
  Trash2,
  Pencil,
  Search,
  X,
} from 'lucide-react'

const categoryIcons = {
  Shopping: ShoppingBag,
  Food: Utensils,
  Transport: Car,
  Salary: Briefcase,
}

function RecentTransactions({ transactions, onDelete, onUpdate }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [editingId, setEditingId] = useState(null)

  const [editForm, setEditForm] = useState({
    name: '',
    amount: '',
    category: 'Food',
    type: 'expense',
    date: '',
  })

  function startEditing(transaction) {
    setEditingId(transaction.id)
    setEditForm({
      name: transaction.name,
      amount: String(transaction.amount),
      category: transaction.category,
      type: transaction.type,
      date: transaction.date,
    })
  }

  function handleUpdate(e) {
    e.preventDefault()

    if (!editForm.name.trim() || Number(editForm.amount) <= 0) {
      return
    }

    onUpdate({
      ...editForm,
      id: editingId,
      name: editForm.name.trim(),
      amount: Number(editForm.amount),
    })

    setEditingId(null)
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.name.toLowerCase().includes(search.toLowerCase()) ||
      transaction.category.toLowerCase().includes(search.toLowerCase())

    const matchesFilter =
      filter === 'all' || transaction.type === filter

    return matchesSearch && matchesFilter
  })

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mt-8">

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Recent Transactions
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Search, filter and manage your financial activity.
        </p>
      </div>

      {/* Search and filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search transactions..."
            className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white outline-none focus:border-emerald-400"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none"
        >
          <option value="all">All Transactions</option>
          <option value="income">Income</option>
          <option value="expense">Expenses</option>
        </select>
      </div>

      {/* Edit form */}
      {editingId !== null && (
        <form
          onSubmit={handleUpdate}
          className="bg-slate-900 border border-emerald-500/40 rounded-xl p-5 mb-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-semibold">Edit Transaction</h3>
            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="text-slate-400 hover:text-white"
              aria-label="Cancel editing"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={editForm.name}
              onChange={(e) =>
                setEditForm({ ...editForm, name: e.target.value })
              }
              placeholder="Transaction name"
              required
              className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
            />

            <input
              type="number"
              min="0.01"
              step="0.01"
              value={editForm.amount}
              onChange={(e) =>
                setEditForm({ ...editForm, amount: e.target.value })
              }
              placeholder="Amount"
              required
              className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
            />

            <select
              value={editForm.category}
              onChange={(e) =>
                setEditForm({ ...editForm, category: e.target.value })
              }
              className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
            >
              <option>Food</option>
              <option>Shopping</option>
              <option>Transport</option>
              <option>Salary</option>
              <option>Entertainment</option>
              <option>Health</option>
              <option>Other</option>
            </select>

            <select
              value={editForm.type}
              onChange={(e) =>
                setEditForm({ ...editForm, type: e.target.value })
              }
              className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <input
              type="date"
              value={editForm.date}
              onChange={(e) =>
                setEditForm({ ...editForm, date: e.target.value })
              }
              required
              className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-5 py-2 rounded-lg"
          >
            Save Changes
          </button>
        </form>
      )}

      {/* Transactions table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-xs uppercase border-b border-slate-700">
              <th className="py-4">Transaction</th>
              <th className="py-4">Category</th>
              <th className="py-4">Date</th>
              <th className="py-4 text-right">Amount</th>
              <th className="py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.map((transaction) => {
              const Icon =
                categoryIcons[transaction.category] || ShoppingBag

              const isIncome = transaction.type === 'income'

              return (
                <tr
                  key={transaction.id}
                  className="border-b border-slate-700/60 last:border-0"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-700 text-emerald-400">
                        <Icon size={18} />
                      </div>
                      <span className="text-white text-sm">
                        {transaction.name}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 text-sm text-slate-400">
                    {transaction.category}
                  </td>

                  <td className="py-4 text-sm text-slate-400">
                    {transaction.date}
                  </td>

                  <td className={`py-4 text-sm font-semibold text-right ${
                    isIncome ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {isIncome ? '+' : '-'}
                    ₹{transaction.amount.toLocaleString('en-IN')}
                  </td>

                  <td className="py-4">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => startEditing(transaction)}
                        className="text-slate-400 hover:text-emerald-400"
                        aria-label={`Edit ${transaction.name}`}
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() => onDelete(transaction.id)}
                        className="text-slate-400 hover:text-red-400"
                        aria-label={`Delete ${transaction.name}`}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}

            {filteredTransactions.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-8 text-slate-400">
                  No matching transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500 mt-4">
        Showing {filteredTransactions.length} of {transactions.length} transactions
      </p>
    </div>
  )
}

export default RecentTransactions
