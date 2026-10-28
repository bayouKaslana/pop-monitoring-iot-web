import { useState } from 'react'
import { MapPin, Search, ShieldAlert, Wifi, WifiOff } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import PopSummaryCard from '../components/PopSummaryCard'
import { usePops } from '../context/popsContext'
import { DEFAULT_THRESHOLDS, hasAlarm } from '../lib/thresholds'

type StatProps = { icon: LucideIcon; bg: string; label: string; value: number }

function Stat({ icon: Icon, bg, label, value }: StatProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white ${bg}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  )
}

export default function Overview() {
  const pops = usePops()
  const th = DEFAULT_THRESHOLDS
  const [query, setQuery] = useState('')

  const online = pops.filter((p) => p.online).length
  const alarms = pops.filter((p) => hasAlarm(p, th)).length

  // POP yang sedang alarm ditaruh paling atas
  const shown = pops
    .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => Number(hasAlarm(b, th)) - Number(hasAlarm(a, th)))

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ringkasan POP</h1>
          <p className="text-sm text-gray-500">Kondisi semua POP secara real-time</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari POP..."
            className="w-48 bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={MapPin} bg="bg-blue-500" label="Total POP" value={pops.length} />
        <Stat icon={Wifi} bg="bg-green-500" label="Online" value={online} />
        <Stat icon={WifiOff} bg="bg-gray-500" label="Offline" value={pops.length - online} />
        <Stat icon={ShieldAlert} bg="bg-red-500" label="Alarm Aktif" value={alarms} />
      </div>

      {shown.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((p) => (
            <PopSummaryCard key={p.pop_id} pop={p} th={th} />
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-sm text-gray-400">POP tidak ditemukan.</p>
      )}
    </div>
  )
}