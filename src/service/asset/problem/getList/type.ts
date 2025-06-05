import { PageResponse } from '@/service/type'

export type Problem = {
  id: number
  code: string
  name: string
  isActive: boolean
  categoryParam: {
    id: number | null
    name: string
  }
}

export type Response = {
  GET: PageResponse<Problem[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
  }
}
