import { useEffect, useState, type ReactNode } from 'react'
import type { Pop } from '../types'
import { PopsContext } from './popsContext'

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))
const round1 = (v: number) => Math.round(v * 10) / 10

// Data tiruan. Nanti diganti dengan data dari backend.
// Untuk menambah POP tiruan, cukup tambah satu objek di sini.
const initial: Pop[] = [
  {
    pop_id: 'POP-JBR-01',
    name: 'POP Jember',
    temp: 30,
    hum: 60,
    volt: 220,
    pln: true,
    door: false,
    online: true,
    ts: Date.now(),
  },
]

export default function PopsProvider({ children }: { children: ReactNode }) {
  const [pops, setPops] = useState<Pop[]>(initial)

  useEffect(() => {
    const id = setInterval(() => {
      setPops((prev) =>
        prev.map((p) => {
          if (!p.online) return p
          const volt = Math.random() < 0.01 ? 0 : round1(220 + (Math.random() - 0.5) * 4)
          return {
            ...p,
            temp: round1(clamp(p.temp + (Math.random() - 0.5) * 2, 18, 42)),
            hum: round1(clamp(p.hum + (Math.random() - 0.5) * 4, 20, 95)),
            volt,
            pln: volt > 150,
            door: Math.random() > 0.05 ? p.door : !p.door,
            ts: Date.now(),
          }
        })
      )
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return <PopsContext.Provider value={pops}>{children}</PopsContext.Provider>
}