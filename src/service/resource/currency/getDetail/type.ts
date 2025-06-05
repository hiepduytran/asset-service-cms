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
  GET: {
    message: string
    traceId: string
    data: Currency
  }
}

export type RequestBody = {
  GET: {
    currencyId: number
  }
}
