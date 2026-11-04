
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  ChartNoAxesCombined,
  Settings,
  CircleHelp,
  LogOut,
} from 'lucide-react'

const menuItems = [
  { name: 'Overview', path: '/', icon: LayoutDashboard },
  { name: 'Transactions', path: '/transactions', icon: ArrowLeftRight },
  { name: 'Budgets', path: '/budgets', icon: Wallet },
  { name: 'Investments', path: '/investments', icon: ChartNoAxesCombined },
]

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-950 text-white flex flex-col border-r border-slate-800 p-5">

      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-wide">
          Fin<span className="text-emerald-400">Track</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Personal Finance Manager
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <p className="text-xs uppercase text-slate-500 mb-4">
          Main Menu
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <Icon size={19} />
              {item.name}
            </NavLink>
          )
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-slate-800 pt-5 space-y-2">

        <button
          type="button"
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white"
        >
          <CircleHelp size={19} />
          Help Center
        </button>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`
          }
        >
          <Settings size={19} />
          Settings
        </NavLink>

        <button
          type="button"
          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-slate-800 rounded-lg"
        >
          <LogOut size={19} />
          Logout
        </button>

      </div>
    </aside>
  )
}

export default Sidebar
