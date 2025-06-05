import { PageResponse } from '@/service/type'

export type ProductStockPing = {
  id: number | null
  sku: string
  name: string
  checkingType: string
  isTrackExpirationDate: boolean
  isTrackWarranty: boolean
}

export type Response = {
  GET: PageResponse<ProductStockPing[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
    pickingId?: number | null
    hasProductAsset: boolean
  }
}
