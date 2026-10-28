import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Calendar, DoorClosed, DoorOpen, Droplets, MapPin, Thermometer, Zap } from 'lucide-react'
import Badge from '../components/Badge'
import HistoryChart from '../components/HistoryChart'
import RecentHistory from '../components/RecentHistory'
import StatCard from '../components/StatCard'
import StatusCard from '../components/StatusCard'
import { usePop } from '../context/popsContext'
import { useHistory } from '../hooks/useHistory'
import { formatDateTime } from '../lib/format'
import { DEFAULT_THRESHOLDS, humLevel, tempLevel } from '../lib/thresholds'

export default function PopDetail() {
  const { id } = useParams()
  const pop = usePop(id)
  const history = useHistory()
  const th = DEFAULT_THRESHOLDS

  if (!pop) {
    return (
      <div className="space-y-3">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline">
          <ArrowLeft className="h-4 w-4" /> Semua POP
        </Link>
        <p className="text-gray-600">POP tidak ditemukan.</p>
      </div>
    )
  }

  const tLevel = tempLevel(pop, th)
  const hLevel = humLevel(pop, th)

  return (
    <div className="space-y-4">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline">
        <ArrowLeft className="h-4 w-4" /> Semua POP
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <MapPin className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{pop.name}</h1>
            <p className="text-sm text-gray-500">Monitoring kondisi POP secara real-time</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs text-gray-600 shadow-sm">
          <Calendar className="h-4 w-4 text-blue-600" />
          <div>
            <p className="text-gray-400">Terakhir diperbarui</p>
            <p className="font-semibold">{formatDateTime(pop.ts)}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Thermometer}
          iconBg="bg-red-500"
          label="Suhu"
          value={`${pop.temp} °C`}
          status={tLevel}
          ok={tLevel === 'Normal'}
        />
        <StatCard
          icon={Droplets}
          iconBg="bg-blue-500"
          label="Kelembapan"
          value={`${pop.hum} %`}
          status={hLevel}
          ok={hLevel === 'Normal'}
        />
        <StatCard
          icon={Zap}
          iconBg="bg-amber-500"
          label="Tegangan PLN"
          value={`${pop.volt} V`}
          status={pop.pln ? 'Normal' : 'Padam'}
          ok={pop.pln}
          badge={<Badge ok={pop.pln} okText="ON" badText="OFF" />}
        />
        <StatCard
          icon={pop.door ? DoorOpen : DoorClosed}
          iconBg="bg-emerald-500"
          label="Pintu"
          value={pop.door ? 'Terbuka' : 'Tertutup'}
          status={pop.door ? 'Terbuka' : 'Normal'}
          ok={!pop.door}
        />
      </div>

      <HistoryChart data={history} />

      <div className="grid gap-4 lg:grid-cols-2">
        <RecentHistory pop={pop} th={th} />
        <StatusCard pop={pop} th={th} />
      </div>
    </div>
  )
}