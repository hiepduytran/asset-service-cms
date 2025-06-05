import { BaseResponse, PageResponse } from '@/service/type'
import { TaskLineResponse } from '../action/type'
export type ImplementMaintenancePlanList = {
  id: number
  code: string
  planType: string
  totalAssets: number
  done: number
  pending: number
  inProcess: number
  startDate: string
  expectedDate: string
  actualDate: string
  status: string
}
export type ImplementMaintenancePlanDetailList = {
  id: number
  dic: string
  name: string
  department: string
  planType: string
  startDate: string
  actualStartDate: string
  executionStatus: string
  check_status: string
}
export type RequestBody = {}

export type RequestParam = {
  GET: {
    ImplementMaintenancePlanList: {
      search: string
      page: number
      size: number
      planType: string | null
    }
  }
}

export type ResponseBody = {
  GET: {
    ImplementMaintenancePlanList: PageResponse<ImplementMaintenancePlanList[]>
    ImplementMaintenancePlanDetailList: BaseResponse<
      ImplementMaintenancePlanDetailList[]
    >
    ImplementMaintenancePlanLTask: BaseResponse<TaskLineResponse[]>
  }
}
