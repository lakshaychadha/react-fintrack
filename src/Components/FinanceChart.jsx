
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

function FinanceChart({ transactions }) {
  const data = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ].map((month, index) => {
    const monthlyTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(`${transaction.date}T00:00:00`)
      return transactionDate.getMonth() === index
    })

    const income = monthlyTransactions
      .filter((transaction) => transaction.type === 'income')
      .reduce((total, transaction) => total + transaction.amount, 0)

    const expenses = monthlyTransactions
      .filter((transaction) => transaction.type === 'expense')
      .reduce((total, transaction) => total + transaction.amount, 0)

    return { month, income, expenses }
  })

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mt-8">
      <h2 className="text-xl font-semibold text-white mb-6">
        Income vs Expenses
      </h2>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

            <XAxis dataKey="month" stroke="#94a3b8" />

            <YAxis stroke="#94a3b8" />

            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #475569',
                borderRadius: '8px',
                color: '#fff',
              }}
            />

            <Legend />

            <Line
              type="monotone"
              dataKey="income"
              stroke="#34d399"
              strokeWidth={3}
              name="Income"
            />

            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#f87171"
              strokeWidth={3}
              name="Expenses"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default FinanceChart
