import type { HistoryPoint } from '../types'

const STEP = 10 * 60 * 1000 // 10 menit
const COUNT = 144 // 24 jam

// Data riwayat tiruan. Nanti diganti dengan data dari backend.
export function buildHistory(): HistoryPoint[] {
  const now = Date.now()
  return Array.from({ length: COUNT }, (_, i) => {
    const ts = now - (COUNT - 1 - i) * STEP
    return {
      ts,
      time: new Date(ts).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      temp: +(28 + Math.sin(i / 12) * 2 + (Math.random() - 0.5)).toFixed(1),
      hum: +(67 + Math.cos(i / 10) * 4 + (Math.random() - 0.5) * 2).toFixed(1),
      volt: +(220 + (Math.random() - 0.5) * 3).toFixed(1),
    }
  })
}