import { PageResponse } from '@/service/type'

export type ProductAttributeCategory = {
  id: number
  code: string
  name: string
}

export type Response = {
  GET: PageResponse<ProductAttributeCategory[]>
}

export type RequestBody = {
  GET: {
    search?: string
    page: number
    size: number
  }
}
