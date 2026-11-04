
import Sidebar from '../Components/Sidebar'

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-900 flex">
      <Sidebar />

      <main className="flex-1 min-w-0 p-8">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
