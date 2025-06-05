import { PageResponse } from '@/service/type'

export type Partner = {
  id: number | null
  name: string
}

export type Response = {
  GET: PageResponse<Partner[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
  }
}
