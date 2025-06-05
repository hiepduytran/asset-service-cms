import { BaseResponse } from '@/service/type'

export interface FirstPeriodDetail {
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


export type RequestParams = {
  GET: { assetFirstPeriod: number }
}

export type Response = {
  GET: BaseResponse<FirstPeriodDetail>
}
