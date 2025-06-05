import { PageResponse } from '@/service/type'

export type problemCategory = {
  id: number
  code: string
  name: string
  isActive: boolean
  categoryType: string
}

export type Response = {
  GET: PageResponse<problemCategory[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
    categoryType: string
    isActive: boolean | null
  }
}
