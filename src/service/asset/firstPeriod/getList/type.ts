import { PageResponse } from '@/service/type'

export interface FirstPeriod {
  id: number
  asset: Asset
  lastMaintenanceDate: string
  assetFirstPeriodLines: AssetFirstPeriodLine[]
  amount: number
}

export interface Asset {
  id: number
  sku: string
  name: string
  imageUrls: string[]
}

export interface AssetFirstPeriodLine {
  id: number
  lastMaintenanceDate: string
  name: string
  sku: string
}

export type Response = {
  GET: PageResponse<FirstPeriod[]>
}

export type RequestBody = {
  GET: {
    search: string | null
    page: number
    size: number
  }
}
