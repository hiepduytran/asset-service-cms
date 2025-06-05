import { PageResponse } from '@/service/type'

export type Product = {
  id: number | null
  sku: string
  name: string
}

export type Response = {
  GET: PageResponse<Product[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
  }
}
