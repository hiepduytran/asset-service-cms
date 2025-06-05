import { PageResponse } from '@/service/type'

type Company = {
  id: number
  code: string
  name: string
  country?: string
  language?: string
  currency?: string
  timezone?: string
  activated?: boolean
}

type SecondaryCurrencyCompany = {
  id: number
  code: string
  name: string
  currency: string
  secondaryCurrencies: Array<{
    id: number
    createdAt: string
    name: string
    symbol: string
    fullName: string
    position: string
    isMainCurrency: boolean
    currencyMin: string
    activated: boolean
    updatedAt: string
  }>
}

export type Response = {
  GET: PageResponse<Array<Company>>
  GET_SECONDARY_CURRENCY: PageResponse<Array<SecondaryCurrencyCompany>>
}

export type RequestBody = {
  GET: {
    search?: string
    currencyId?: number | null
    countryId?: number | null
    activated?: boolean | null
    page: number
    size: number
  }
  GET_SECONDARY_CURRENCY: {
    page: number
    size: number
  }
}
