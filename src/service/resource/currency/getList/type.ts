import { PageResponse } from '@/service/type'

export type Currency = {
  id: number
  name: string
  alias: string
  symbol: string
  fullName: string
  position: string
  rounding: number
  isMainCurrency: true
  rate: number
  currencyMin: string
  createdAt: string
  updatedAt: string
  activated: boolean
}

export type Response = {
  GET: PageResponse<Currency[]>
}

export type RequestBody = {
  GET: {
    name?: string | null
    activated?: boolean | null
    page: number
    size: number
  }
}
