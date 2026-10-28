import { useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { HistoryPoint } from '../types'

const RANGES = [1, 6, 12, 24]

export default function HistoryChart({ data }: { data: HistoryPoint[] }) {
  const [hours, setHours] = useState(24)

  const end = data.length ? data[data.length - 1].ts : 0
  const shown = data.filter((d) => d.ts >= end - hours * 3600 * 1000)

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-bold text-gray-900">Grafik {hours} Jam Terakhir</h2>
        <div className="flex overflow-hidden rounded-lg border border-gray-200 text-xs font-medium">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setHours(r)}
              className={`px-3 py-1.5 ${hours === r ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {r} Jam
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={shown} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="time" tick={{ fontSize: 12 }} minTickGap={40} />
            <YAxis yAxisId="left" domain={[0, 100]} tick={{ fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" domain={[180, 240]} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="temp" name="Suhu (°C)" stroke="#f59e0b" strokeWidth={2} dot={false} />
            <Line yAxisId="left" type="monotone" dataKey="hum" name="Kelembapan (%)" stroke="#3b82f6" strokeWidth={2} dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="volt" name="Tegangan (V)" stroke="#22c55e" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}