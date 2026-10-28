import { Link } from 'react-router-dom'
import { formatDateTime } from '../lib/format'
import { hasAlarm, humLevel, tempLevel } from '../lib/thresholds'
import type { Pop, Thresholds } from '../types'
import Badge from './Badge'

type Props = { pop: Pop; th: Thresholds }

export default function PopSummaryCard({ pop, th }: Props) {
  const alarm = hasAlarm(pop, th)
  const tBad = tempLevel(pop, th) !== 'Normal'
  const hBad = humLevel(pop, th) !== 'Normal'

  return (
    <Link
      to={`/pop/${pop.pop_id}`}
      className={`block rounded-xl border-2 bg-white p-4 shadow-sm transition hover:shadow-md ${
        alarm ? 'border-red-400' : 'border-transparent'
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">{pop.name}</h2>
          <p className="text-xs text-gray-400">{pop.pop_id}</p>
        </div>
        <Badge ok={pop.online} okText="Online" badText="Offline" />
      </div>

      {pop.online ? (
        <>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className={`rounded-lg p-3 ${tBad ? 'bg-red-50' : 'bg-gray-50'}`}>
              <p className="text-xs text-gray-500">Suhu</p>
              <p className={`text-xl font-bold ${tBad ? 'text-red-600' : 'text-gray-900'}`}>{pop.temp}°C</p>
            </div>
            <div className={`rounded-lg p-3 ${hBad ? 'bg-red-50' : 'bg-gray-50'}`}>
              <p className="text-xs text-gray-500">Kelembapan</p>
              <p className={`text-xl font-bold ${hBad ? 'text-red-600' : 'text-gray-900'}`}>{pop.hum}%</p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <Badge ok={pop.pln} okText="PLN ON" badText="PLN OFF" />
            <Badge ok={!pop.door} okText="Pintu Tertutup" badText="Pintu Terbuka" />
          </div>
        </>
      ) : (
        <p className="mt-4 text-sm text-gray-400">Perangkat tidak mengirim data.</p>
      )}

      <p className="mt-3 text-xs text-gray-400">Diperbarui {formatDateTime(pop.ts)}</p>
    </Link>
  )
}