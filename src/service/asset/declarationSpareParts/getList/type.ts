import { PageResponse } from '@/service/type'

export type AssetAccessory = {
  id: number
  sku: string
  name: string
  itemQuantity: number
}

export type Response = {
  GET: PageResponse<AssetAccessory[]>
}

export type RequestBody = {
  GET: {
    search?: string
    page?: number
    size?: number
  }
}
