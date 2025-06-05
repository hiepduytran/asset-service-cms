import { PageResponse } from '@/service/type'

export type ListParamAsset = {
  id: number
  code: string
  updatedAt: string
  uom: {
    id: number
    code: string
    name: string
  }
  partner: {
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
  GET: PageResponse<ListParamAsset[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    partner?: {
      id: number | null
      name: string
    }
    page: number
    size: number
  }
}
