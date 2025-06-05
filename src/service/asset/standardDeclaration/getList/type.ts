import { PageResponse } from '@/service/type'

export type GroupStandard = {
  id: number
  code: string
  name: string
  standardCreatedAt: Date
  createdBy: string
  status: boolean
}

export type Response = {
  GET: PageResponse<GroupStandard[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
  }
}
