import type { Pop, Thresholds } from '../types'

export const DEFAULT_THRESHOLDS: Thresholds = {
  temp_max: 35,
  temp_min: 15,
  hum_max: 80,
  hum_min: 30,
}

export type Level = 'Normal' | 'Tinggi' | 'Rendah'

export const tempLevel = (p: Pop, th: Thresholds): Level =>
  p.temp > th.temp_max ? 'Tinggi' : p.temp < th.temp_min ? 'Rendah' : 'Normal'

export const humLevel = (p: Pop, th: Thresholds): Level =>
  p.hum > th.hum_max ? 'Tinggi' : p.hum < th.hum_min ? 'Rendah' : 'Normal'

export const alarmMessages = (p: Pop, th: Thresholds): string[] => {
  const m: string[] = []
  if (p.temp > th.temp_max) m.push(`Suhu ${p.temp}°C melebihi batas ${th.temp_max}°C`)
  if (p.temp < th.temp_min) m.push(`Suhu ${p.temp}°C di bawah batas ${th.temp_min}°C`)
  if (p.hum > th.hum_max) m.push(`Kelembapan ${p.hum}% melebihi batas ${th.hum_max}%`)
  if (p.hum < th.hum_min) m.push(`Kelembapan ${p.hum}% di bawah batas ${th.hum_min}%`)
  if (!p.pln) m.push('Listrik PLN padam')
  if (p.door) m.push('Pintu POP terbuka')
  return m
}

export const hasAlarm = (p: Pop, th: Thresholds) => p.online && alarmMessages(p, th).length > 0