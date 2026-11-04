
import { useState } from 'react'
import { Plus } from 'lucide-react'

function AddTransaction({ onAdd }) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [type, setType] = useState('expense')
  const [date, setDate] = useState(
    new Date().toISOString().split('T')[0]
  )

  function handleSubmit(e) {
    e.preventDefault()

    if (!name.trim() || !amount || Number(amount) <= 0) {
      return
    }

    onAdd({
      id: Date.now(),
      name: name.trim(),
      amount: Number(amount),
      category,
      type,
      date,
    })

    setName('')
    setAmount('')
    setCategory('Food')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mt-8"
    >
      <div className="flex items-center gap-2 mb-6">
        <Plus className="text-emerald-400" />
        <h2 className="text-xl font-semibold text-white">
          Add Transaction
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div>
          <label className="block text-sm text-slate-400 mb-2">
            Transaction Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Grocery shopping"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white outline-none focus:border-emerald-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-2">
            Amount (₹)
          </label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white outline-none focus:border-emerald-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white outline-none"
          >
            <option>Food</option>
            <option>Shopping</option>
            <option>Transport</option>
            <option>Salary</option>
            <option>Entertainment</option>
            <option>Health</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-2">
            Transaction Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white outline-none"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-2">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white outline-none"
            required
          />
        </div>

      </div>

      <button
        type="submit"
        className="mt-6 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-6 py-3 rounded-lg transition"
      >
        Add Transaction
      </button>
    </form>
  )
}

export default AddTransaction
