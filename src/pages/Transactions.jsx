
import DashboardLayout from '../layouts/DashboardLayout'
import RecentTransactions from '../Components/RecentTransactions'

function Transactions({
  transactions,
  deleteTransaction,
  updateTransaction,
}) {
  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold text-white">
          Transactions
        </h1>

        <p className="text-slate-400 mt-2">
          View, search, edit and manage all your transactions.
        </p>
      </div>

      <RecentTransactions
        transactions={transactions}
        onDelete={deleteTransaction}
        onUpdate={updateTransaction}
      />
    </DashboardLayout>
  )
}

export default Transactions
