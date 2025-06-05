import { PageResponse } from '@/service/type'

export type UsageStatus = {
  id: number
  code: string
  name: string
  isActive: boolean
}

export type Response = {
  GET: PageResponse<UsageStatus[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
    categoryType: string
  }
}
