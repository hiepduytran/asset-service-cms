import { PageResponse } from '@/service/type'

export type StandardApproval = {
  id: number
  productName: string
  product: {
    id: number
    name: string
    sku: string
    uomId: number
    uomName: string
    productCategory: null
    imageUrls: string[]
  }
  state: any
}

export type Response = {
  GET: PageResponse<StandardApproval[]>
}

export type RequestBody = {
  GET: {
    search: string | null
    state: any | null
  }
}
