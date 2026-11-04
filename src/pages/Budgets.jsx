
import { useEffect, useState } from 'react'
import { Target, Trash2 } from 'lucide-react'
import DashboardLayout from '../layouts/DashboardLayout'

function Budgets({ transactions }) {
  // Load saved budgets from localStorage
  const [budgets, setBudgets] = useState(() => {
    const savedBudgets = localStorage.getItem('fintrack-budgets')

    return savedBudgets
      ? JSON.parse(savedBudgets)
      : [
          { id: 1, category: 'Food', limit: 5000 },
          { id: 2, category: 'Shopping', limit: 8000 },
          { id: 3, category: 'Transport', limit: 3000 },
        ]
  })

  const [category, setCategory] = useState('Food')
  const [limit, setLimit] = useState('')

  // Save budgets whenever they change
  useEffect(() => {
    localStorage.setItem(
      'fintrack-budgets',
      JSON.stringify(budgets)
    )
  }, [budgets])

  // Add a new budget
  function addBudget(e) {
    e.preventDefault()

    if (!limit || Number(limit) <= 0) return

    // Prevent duplicate category budgets
    const alreadyExists = budgets.some(
      (budget) => budget.category === category
    )

    if (alreadyExists) {
      alert('A budget for this category already exists.')
      return
    }

    setBudgets((previous) => [
      ...previous,
      {
        id: Date.now(),
        category,
        limit: Number(limit),
      },
    ])

    setLimit('')
  }

  // Delete a budget
  function deleteBudget(id) {
    setBudgets((previous) =>
      previous.filter((budget) => budget.id !== id)
    )
  }

  // Calculate current month's spending
  const currentDate = new Date()

  function getSpent(categoryName) {
    return transactions
      .filter((transaction) => {
        const transactionDate = new Date(
          `${transaction.date}T00:00:00`
        )

        return (
          transaction.type === 'expense' &&
          transaction.category === categoryName &&
          transactionDate.getMonth() === currentDate.getMonth() &&
          transactionDate.getFullYear() === currentDate.getFullYear()
        )
      })
      .reduce(
        (total, transaction) => total + transaction.amount,
        0
      )
  }

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold text-white">Budgets</h1>
        <p className="text-slate-400 mt-2">
          Set spending limits and manage your monthly budgets.
        </p>
      </div>

      {/* Create Budget Form */}
      <form
        onSubmit={addBudget}
        className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mt-8"
      >
        <h2 className="text-white text-lg font-semibold mb-4">
          Create a Budget
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
          >
            <option>Food</option>
            <option>Shopping</option>
            <option>Transport</option>
            <option>Entertainment</option>
            <option>Health</option>
            <option>Other</option>
          </select>

          <input
            type="number"
            min="1"
            step="0.01"
            placeholder="Monthly limit (₹)"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
          />

          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-6 py-3 rounded-lg"
          >
            Add Budget
          </button>
        </div>
      </form>

      {/* Budget Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {budgets.map((budget) => {
          const spent = getSpent(budget.category)
          const percentage = (spent / budget.limit) * 100
          const progress = Math.min(percentage, 100)
          const remaining = budget.limit - spent
          const exceeded = remaining < 0

          return (
            <div
              key={budget.id}
              className="bg-slate-800 border border-slate-700 rounded-2xl p-6"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-500/10 text-emerald-400 p-3 rounded-xl">
                    <Target size={22} />
                  </div>

                  <h3 className="text-white font-semibold">
                    {budget.category}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => deleteBudget(budget.id)}
                  className="text-slate-400 hover:text-red-400"
                  aria-label={`Delete ${budget.category} budget`}
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="flex justify-between mt-6 mb-2">
                <span className="text-slate-400 text-sm">Spent</span>

                <span className="text-white text-sm">
                  ₹{spent.toLocaleString('en-IN')} / ₹
                  {budget.limit.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    exceeded || percentage >= 90
                      ? 'bg-red-400'
                      : 'bg-emerald-400'
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="text-slate-400 text-xs mt-3">
                {percentage.toFixed(0)}% of budget used
              </p>

              <p
                className={`text-sm mt-2 ${
                  exceeded ? 'text-red-400' : 'text-emerald-400'
                }`}
              >
                {exceeded
                  ? `Over budget by ₹${Math.abs(remaining).toLocaleString('en-IN')}`
                  : `₹${remaining.toLocaleString('en-IN')} remaining`}
              </p>
            </div>
          )
        })}
      </div>
    </DashboardLayout>
  )
}

export default Budgets
