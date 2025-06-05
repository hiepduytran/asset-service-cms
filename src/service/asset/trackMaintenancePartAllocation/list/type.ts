import { BaseResponse, PageResponse } from '@/service/type'

export type DetailPlanMaintenanceAllocation = {
  id: number
  requestDate: string
  maintenanceAccessory: number
  status: string
}

export type DetailPlanMaintenanceAllocationChild = {
  id: number
  product: {
    id: number
    name: string
    code: string
  }
  uom: {
    id: number
    name: string
    code: string
  }
  request: number
  allocated: number
}

export type RequestBody = {
  GET: {
    search: string
    page: number
    size: number
    status: string | null
  }
}

export type RequestParam = { GET: {} }

export type ResponseBody = {
  GET: {
    ListPlanMaintenanceAllocation: PageResponse<
      DetailPlanMaintenanceAllocation[]
    >
    ListPlanMaintenanceAllocationChild: BaseResponse<
      DetailPlanMaintenanceAllocationChild[]
    >
  }
}
