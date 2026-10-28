import { useState } from 'react'
import { buildHistory } from '../lib/mockHistory'

export function useHistory() {
  const [data] = useState(buildHistory)
  return data
}