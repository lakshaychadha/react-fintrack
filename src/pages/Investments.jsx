
import { useEffect, useState } from 'react'
import { TrendingUp, Trash2 } from 'lucide-react'
import DashboardLayout from '../layouts/DashboardLayout'

function Investments() {
  // Load investments from localStorage
  const [investments, setInvestments] = useState(() => {
    const savedInvestments = localStorage.getItem('fintrack-investments')

    return savedInvestments
      ? JSON.parse(savedInvestments)
      : [
          { id: 1, name: 'Nifty 50 Index Fund', type: 'Mutual Fund', amount: 10000 },
          { id: 2, name: 'Reliance Industries', type: 'Stocks', amount: 15000 },
          { id: 3, name: 'Gold ETF', type: 'ETF', amount: 5000 },
        ]
  })

  const [name, setName] = useState('')
  const [type, setType] = useState('Mutual Fund')
  const [amount, setAmount] = useState('')

  // Save investments whenever they change
  useEffect(() => {
    localStorage.setItem(
      'fintrack-investments',
      JSON.stringify(investments)
    )
  }, [investments])

  // Add investment
  function addInvestment(e) {
    e.preventDefault()

    if (!name.trim() || !amount || Number(amount) <= 0) return

    setInvestments((previous) => [
      ...previous,
      {
        id: Date.now(),
        name: name.trim(),
        type,
        amount: Number(amount),
      },
    ])

    setName('')
    setAmount('')
  }

  // Delete investment
  function deleteInvestment(id) {
    setInvestments((previous) =>
      previous.filter((investment) => investment.id !== id)
    )
  }

  // Calculate total investment
  const totalInvestment = investments.reduce(
    (total, investment) => total + investment.amount,
    0
  )

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold text-white">Investments</h1>
        <p className="text-slate-400 mt-2">
          Track your investments in one place.
        </p>
      </div>

      {/* Total Investment */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mt-8">
        <p className="text-slate-400 text-sm">Total Invested</p>
        <h2 className="text-3xl text-white font-bold mt-2">
          ₹{totalInvestment.toLocaleString('en-IN')}
        </h2>
      </div>

      {/* Add Investment Form */}
      <form
        onSubmit={addInvestment}
        className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mt-6"
      >
        <h2 className="text-white text-lg font-semibold mb-4">
          Add Investment
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Investment name"
            className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
            required
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
          >
            <option>Mutual Fund</option>
            <option>Stocks</option>
            <option>ETF</option>
            <option>Fixed Deposit</option>
            <option>Gold</option>
            <option>Other</option>
          </select>

          <input
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount (₹)"
            className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-6 py-3 rounded-lg mt-4"
        >
          Add Investment
        </button>
      </form>

      {/* Investment List */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mt-6">
        <h2 className="text-white text-lg font-semibold mb-5">
          Your Investments
        </h2>

        <div className="space-y-4">
          {investments.map((investment) => (
            <div
              key={investment.id}
              className="flex items-center justify-between gap-4 border-b border-slate-700 pb-4 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="bg-emerald-500/10 text-emerald-400 p-3 rounded-xl">
                  <TrendingUp size={20} />
                </div>

                <div>
                  <h3 className="text-white font-medium">
                    {investment.name}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {investment.type}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-emerald-400 font-semibold">
                  ₹{investment.amount.toLocaleString('en-IN')}
                </span>

                <button
                  type="button"
                  onClick={() => deleteInvestment(investment.id)}
                  className="text-slate-400 hover:text-red-400"
                  aria-label={`Delete ${investment.name}`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          {investments.length === 0 && (
            <p className="text-slate-400 text-center py-6">
              No investments added yet.
            </p>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Investments
