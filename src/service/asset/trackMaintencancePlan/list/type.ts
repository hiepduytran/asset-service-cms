import { BaseResponse, PageResponse } from '@/service/type'

export type DetailPlanMaintenance = {
  id: number
  code: string
  name: string
  planType: string
  scheduledMaintenanceDate: string
  status: string
  allocationStatus: string
}

export type DetailPlanMaintenanceRequest = {
  request: {
    id: number
    name: string
    code: string
  }
  stockPickingLines: [
    {
      product: {
        id: number
        name: string
      }
      demandQty: number
    }
  ]
  status: string
}

export type RequestBody = {
  GET: {
    search: string
    page: number
    size: number
  }
}

export type RequestParam = { GET: {} }

export type Response = {
  GET: {
    ListPlanMaintenance: PageResponse<DetailPlanMaintenance[]>
    DetailPlanMaintenanceRequest: BaseResponse<DetailPlanMaintenanceRequest>
  }
}
