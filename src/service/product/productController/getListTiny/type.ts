import { PageResponse } from '@/service/type'

type Product = {
  id: number
  name: string
}

export type Response = {
  GET: PageResponse<Product[]>
}

export type RequestBody = {
  GET: {
    search?: number
    page: number
    size: number
  }
}
