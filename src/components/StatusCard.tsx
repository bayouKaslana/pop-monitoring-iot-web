import { MapPin, ShieldAlert, ShieldCheck } from 'lucide-react'
import { alarmMessages } from '../lib/thresholds'
import type { Pop, Thresholds } from '../types'

type Props = { pop: Pop; th: Thresholds }

export default function StatusCard({ pop, th }: Props) {
  const messages = alarmMessages(pop, th)
  const normal = messages.length === 0

  return (
    <div className={`flex flex-col justify-between rounded-xl p-4 shadow-sm ${normal ? 'bg-green-50' : 'bg-red-50'}`}>
      <div className="flex items-start gap-4">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white ${
            normal ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {normal ? <ShieldCheck className="h-7 w-7" /> : <ShieldAlert className="h-7 w-7" />}
        </div>
        <div>
          <h2 className={`text-lg font-bold ${normal ? 'text-green-700' : 'text-red-700'}`}>
            {normal ? 'Semua Kondisi Normal' : 'Ada Alarm Aktif'}
          </h2>
          {normal ? (
            <p className="mt-1 text-sm text-gray-600">Tidak ada peringatan atau anomali pada POP ini.</p>
          ) : (
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-red-700">
              {messages.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <p className="mt-4 flex items-center gap-1.5 text-xs text-gray-500">
        <MapPin className="h-4 w-4" /> {pop.name}
      </p>
    </div>
  )
}