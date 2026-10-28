import { NavLink, useLocation } from 'react-router-dom'
import { Activity, Bell, History, LayoutDashboard, Radio, Settings } from 'lucide-react'

const menu = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/realtime', label: 'Data Real-time', icon: Activity },
  { to: '/riwayat', label: 'Riwayat Data', icon: History },
  { to: '/notifikasi', label: 'Notifikasi', icon: Bell },
  { to: '/pengaturan', label: 'Pengaturan', icon: Settings },
]

type Props = { open: boolean; onClose: () => void }

export default function Sidebar({ open, onClose }: Props) {
  const { pathname } = useLocation()

  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={onClose} />}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-60 flex-col bg-[#0b1d3f] text-white transition-transform lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-3 px-5 py-5">
          <Radio className="h-8 w-8 text-sky-400" />
          <div>
            <p className="font-bold leading-tight">ISP Monitoring</p>
            <p className="text-xs text-sky-200">POP Monitoring System</p>
          </div>
        </div>

        <nav className="mt-2 flex-1 space-y-1 px-3">
          {menu.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={onClose}
              className={({ isActive }) => {
                const active = isActive || (to === '/' && pathname.startsWith('/pop/'))
                return `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  active ? 'bg-blue-600 text-white' : 'text-sky-100 hover:bg-white/10'
                }`
              }}
            >
              <Icon className="h-5 w-5" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-5 py-4 text-xs text-sky-200">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green-400" />
          Sistem Online
        </div>
      </aside>
    </>
  )
}