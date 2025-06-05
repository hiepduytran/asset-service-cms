import { BaseResponse } from '@/service/type'

export interface AssetPeriodDetail {
  product: Product
  period: number
  periodType: string
  frequency: number
  frequencyType: string
  assetPeriodLines: AssetPeriodLine[]
}

export interface Product {
  id: number
  sku: string
  name: string
  imageUrls: string[]
}

export interface AssetPeriodLine {
  assetAccessoryLine: AssetAccessoryLine
  period: number
  periodType: string
  frequency: number
  frequencyType: string
}

export interface AssetAccessoryLine {
  id: number
  name: string
  code: string
}



export type RequestParams = {
  GET: { assetPeriodId: number }
}

export type Response = {
  GET: BaseResponse<AssetPeriodDetail>
}
