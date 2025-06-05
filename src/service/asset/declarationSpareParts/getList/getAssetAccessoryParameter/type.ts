import { PageResponse } from '@/service/type'

export type AssetAccessoryParameter = {
  id: number
  product: {
    id: number
    name: string
    code: string
  }
  quantity: number
  uom: {
    id: number
    name: string
    code: string
  }
}

export type Response = {
  GET: PageResponse<AssetAccessoryParameter[]>
}

export type RequestBody = {
  GET: {
    assetAccessoryId: number
  }
}
