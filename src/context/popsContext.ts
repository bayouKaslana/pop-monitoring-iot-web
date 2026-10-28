import { createContext, useContext } from 'react'
import type { Pop } from '../types'

export const PopsContext = createContext<Pop[] | null>(null)

export function usePops(): Pop[] {
  const ctx = useContext(PopsContext)
  if (!ctx) throw new Error('usePops harus dipakai di dalam PopsProvider')
  return ctx
}

export function usePop(id: string | undefined): Pop | undefined {
  return usePops().find((p) => p.pop_id === id)
}