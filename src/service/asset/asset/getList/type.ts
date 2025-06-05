import { PageResponse } from '@/service/type'

export type Asset = {
  id: number
  code: string
  updatedAt: string
  uom: {
    id: number
    code: string
    name: string
  }
  assetType: string
  partner: {
    id: number
    name: string
    code: string
  }
  importWarehouse: {
    id: number
    name: string
    code: string
  }
  product: {
    id: number
    name: string
    sku: string
    uomId: number
    uomName: string
    productCategory: {
      id: number
      name: string
      code: string
    }
  }
}

export type Response = {
  GET: PageResponse<Asset[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
    updatedAt: string
    view: string
    partner?: {
      id: number
      name: string
    }
    partnerId?: number
  }
}
