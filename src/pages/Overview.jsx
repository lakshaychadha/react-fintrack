
import DashboardLayout from '../layouts/DashboardLayout'
import StatCard from '../Components/StatCard'
import FinanceChart from '../Components/FinanceChart'
import AddTransaction from '../Components/AddTransaction'
import RecentTransactions from '../Components/RecentTransactions'

function Overview({
  transactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
}) {
  const totalIncome = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0)

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0)

  const balance = totalIncome - totalExpenses

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold text-white">
          Dashboard Overview
        </h1>
        <p className="text-slate-400 mt-2">
          Welcome back! Here's your financial overview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
        <StatCard
          title="Total Balance"
          amount={`₹${balance.toLocaleString('en-IN')}`}
          change="Live calculation"
          type="income"
        />

        <StatCard
          title="Total Income"
          amount={`₹${totalIncome.toLocaleString('en-IN')}`}
          change="Updated automatically"
          type="income"
        />

        <StatCard
          title="Total Expenses"
          amount={`₹${totalExpenses.toLocaleString('en-IN')}`}
          change="Updated automatically"
          type="expense"
        />
      </div>

      <FinanceChart transactions={transactions} />

      <AddTransaction onAdd={addTransaction} />

      <RecentTransactions
        transactions={transactions}
        onDelete={deleteTransaction}
        onUpdate={updateTransaction}
      />
    </DashboardLayout>
  )
}

export default Overview
