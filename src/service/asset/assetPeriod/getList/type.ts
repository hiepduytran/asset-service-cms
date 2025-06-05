import { PageResponse } from '@/service/type'

export interface AssetPeriod {
  id: number
  sku: string
  name: string
  period: string
  frequency: string
  assetAccessory: number
}


export type Response = {
  GET: PageResponse<AssetPeriod[]>
}

export type RequestBody = {
  GET: {
    search: string | null
    page: number
    size: number
  }
}
