import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

type Props = {
  icon: LucideIcon
  iconBg: string
  label: string
  value: string
  status: string
  ok: boolean
  badge?: ReactNode
}

export default function StatCard({ icon: Icon, iconBg, label, value, status, ok, badge }: Props) {
  return (
    <div className="relative rounded-xl bg-white p-4 shadow-sm">
      {badge && <div className="absolute right-3 top-3">{badge}</div>}
      <div className="flex items-center gap-4">
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-white ${iconBg}`}>
          <Icon className="h-7 w-7" />
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className={`text-2xl font-bold ${ok ? 'text-gray-900' : 'text-red-600'}`}>{value}</p>
          <p className={`mt-1 flex items-center gap-1.5 text-xs font-medium ${ok ? 'text-green-600' : 'text-red-600'}`}>
            <span className={`h-2 w-2 rounded-full ${ok ? 'bg-green-500' : 'bg-red-500'}`} />
            {status}
          </p>
        </div>
      </div>
    </div>
  )
}