import { BaseResponse } from '@/service/type'

export type TrackAssetListParameter = {
  id: number
  date: string
  code: string
  source: string
  quantity: number
  uom: {
    id: number
    name: string
    code: string
  }
}

export type Response = {
  GET: BaseResponse<TrackAssetListParameter[]>
}

export type RequestBody = {
  GET: {
    id: number
    assetAllocationIds: number[]
  }
}
