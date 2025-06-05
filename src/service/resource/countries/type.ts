import { PageResponse } from '@/service/type'

export type Country = {
  id: number | null
  namr: string
}

export type Response = {
  GET: PageResponse<Country[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
  }
}
