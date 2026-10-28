import { DoorClosed, DoorOpen, Droplets, Thermometer, Zap } from 'lucide-react'
import { formatDateTime } from '../lib/format'
import { humLevel, tempLevel } from '../lib/thresholds'
import type { Pop, Thresholds } from '../types'

type Props = { pop: Pop; th: Thresholds }

export default function RecentHistory({ pop, th }: Props) {
  const tLevel = tempLevel(pop, th)
  const hLevel = humLevel(pop, th)

  const rows = [
    { icon: Thermometer, bg: 'bg-red-500', label: 'Suhu', value: `${pop.temp} °C`, status: tLevel, ok: tLevel === 'Normal' },
    { icon: Droplets, bg: 'bg-blue-500', label: 'Kelembapan', value: `${pop.hum} %`, status: hLevel, ok: hLevel === 'Normal' },
    { icon: Zap, bg: 'bg-amber-500', label: 'Tegangan PLN', value: `${pop.volt} V`, status: pop.pln ? 'ON' : 'OFF', ok: pop.pln },
    {
      icon: pop.door ? DoorOpen : DoorClosed,
      bg: 'bg-emerald-500',
      label: 'Pintu',
      value: pop.door ? 'Terbuka' : 'Tertutup',
      status: pop.door ? 'Terbuka' : 'Normal',
      ok: !pop.door,
    },
  ]

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <h2 className="font-bold text-gray-900">Riwayat Terakhir</h2>
      <ul className="mt-3 divide-y divide-gray-100">
        {rows.map(({ icon: Icon, bg, label, value, status, ok }) => (
          <li key={label} className="flex items-center gap-3 py-2.5">
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white ${bg}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">{label}</p>
              <p className="text-xs text-gray-600">
                {value}{' '}
                <span className={ok ? 'text-green-600' : 'font-semibold text-red-600'}>({status})</span>
              </p>
            </div>
            <p className="text-xs text-gray-400">{formatDateTime(pop.ts)}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}