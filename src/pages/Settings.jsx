
import { useState } from 'react'
import { User, Bell, Shield, Save } from 'lucide-react'
import DashboardLayout from '../layouts/DashboardLayout'

function Settings() {
  const [profile, setProfile] = useState({
    name: 'FinTrack User',
    email: 'user@example.com',
    currency: 'INR',
  })

  const [notifications, setNotifications] = useState(true)

  function handleSave(e) {
    e.preventDefault()
    alert('Settings saved successfully!')
  }

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-slate-400 mt-2">
          Manage your account and application preferences.
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="max-w-2xl bg-slate-800 border border-slate-700 rounded-2xl p-6 mt-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <User className="text-emerald-400" size={22} />
          <h2 className="text-white text-lg font-semibold">
            Profile Information
          </h2>
        </div>

        <label className="block text-slate-400 text-sm mb-2">
          Full Name
        </label>

        <input
          value={profile.name}
          onChange={(e) =>
            setProfile({ ...profile, name: e.target.value })
          }
          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white mb-5"
        />

        <label className="block text-slate-400 text-sm mb-2">
          Email Address
        </label>

        <input
          type="email"
          value={profile.email}
          onChange={(e) =>
            setProfile({ ...profile, email: e.target.value })
          }
          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white mb-5"
        />

        <div className="flex items-center gap-3 mb-3">
          <Shield className="text-emerald-400" size={20} />
          <h2 className="text-white font-semibold">Preferences</h2>
        </div>

        <label className="block text-slate-400 text-sm mb-2">
          Currency
        </label>

        <select
          value={profile.currency}
          onChange={(e) =>
            setProfile({ ...profile, currency: e.target.value })
          }
          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white mb-5"
        >
          <option value="INR">Indian Rupee (₹)</option>
          <option value="USD">US Dollar ($)</option>
          <option value="EUR">Euro (€)</option>
        </select>

        <div className="flex items-center justify-between py-4 border-t border-slate-700">
          <div className="flex items-center gap-3">
            <Bell className="text-emerald-400" size={20} />
            <span className="text-white">Notifications</span>
          </div>

          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            className="w-5 h-5 accent-emerald-400"
          />
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-6 py-3 rounded-lg mt-5"
        >
          <Save size={18} />
          Save Settings
        </button>
      </form>
    </DashboardLayout>
  )
}

export default Settings
