import { PageResponse } from '@/service/type'

export type AnnualMaintenancePlan = {
  id: number
  code: string
  name: string
  planType: string
  createDate: Date
  approveEnum: string
}

export type Response = {
  GET: PageResponse<AnnualMaintenancePlan[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    status?: boolean | null
    page: number
    size: number
  }
}
