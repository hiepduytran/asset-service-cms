import { PageResponse } from '@/service/type'

export type IncidentList = {
  id: number
  asset: {
    id: number
    code: string
    name: string
  }
  card: {
    id: number
    code: string
  }
  department: {
    id: number
    code: string
    name: string
  }
  quantity: number
}

export type Response = {
  GET: PageResponse<IncidentList[]>
}

export type RequestBody = {
  GET: {
    search?: string
    departmentId?: number | null
    page?: number
    size?: number
  }
}
