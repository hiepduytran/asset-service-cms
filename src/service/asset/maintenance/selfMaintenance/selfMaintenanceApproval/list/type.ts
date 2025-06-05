import { PageResponse } from '@/service/type'

export interface MaintenanceCardApproval {
    id: number
    code: string
    name: string
    sku: string
    nameProduct: string
    startDate: string
    state: string
  }
  

export type Response = {
  GET: PageResponse<MaintenanceCardApproval[]>
}

export type RequestBody = {
  GET: {
    search: string | null
    state: any | null
  }
}
