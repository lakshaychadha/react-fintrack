
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

function StatCard({ title, amount, change, type }) {
  const isPositive = type === 'income'

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
      <p className="text-sm text-slate-400">{title}</p>

      <h2 className="text-2xl font-bold text-white mt-3">
        {amount}
      </h2>

      <div className={`flex items-center gap-1 mt-3 text-sm ${
        isPositive ? 'text-emerald-400' : 'text-red-400'
      }`}>
        {isPositive
          ? <ArrowUpRight size={17} />
          : <ArrowDownRight size={17} />
        }

        <span>{change}</span>
        <span className="text-slate-500">vs last month</span>
      </div>
    </div>
  )
}

export default StatCard
