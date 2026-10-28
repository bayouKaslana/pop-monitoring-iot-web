export type Pop = {
  pop_id: string
  name: string
  temp: number
  hum: number
  volt: number
  pln: boolean
  door: boolean
  online: boolean
  ts: number
}

export type Thresholds = {
  temp_max: number
  temp_min: number
  hum_max: number
  hum_min: number
}

export type HistoryPoint = {
  ts: number
  time: string
  temp: number
  hum: number
  volt: number
}