import { PageResponse } from '@/service/type'

export type Vendor = {
  id: number | null
  name: string
}

export type Response = {
  GET: PageResponse<Vendor[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
    productIds?: number | null
  }
}
