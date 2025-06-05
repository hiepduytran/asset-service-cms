import { PageResponse } from '@/service/type'

export type ListUnit = {
  id: number
  name: string
}

export type Response = {
  GET: PageResponse<ListUnit[]>
}

export type RequestBody = {
  GET: {
    search?: string | string
    page: number
    size: number
    activated?: boolean
  }
}
