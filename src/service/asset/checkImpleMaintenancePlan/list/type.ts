import { PageResponse } from '@/service/type'

export type ImplementMaintenancePlanCheck = {
  id: number
  assetAccessoryId: number
  code: string
  dic: string
  name: string
  department: string
  planType: string
  startDate: string
  actualEndDate: string
  executionStatus: string
  checkStatus: string
}

export type RequestParam = {
  GET: {
    search: string
    page: number
    size: number
    planType: string | null
  }
}

export type RequestBody = {}
export type ResponseBody = {
  GET: {
    ImplementMaintenancePlanCheck: PageResponse<ImplementMaintenancePlanCheck[]>
  }
}
