import { BaseResponse } from '@/service/type'

export type RequestAllocationParameter = {
  asset: {
    id: number
    name: string
    code: string
  }
  quantity: number
  uom: {
    id: number
    name: string
    code: string | null
  }
  requestQuantity: number
  allocatedQuantity: number
  allocationStatus: string
}

export type Response = {
  GET: BaseResponse<RequestAllocationParameter[]>
}

export type RequestBody = {
  GET: {
    RequestAllocationParameter: { id: number }
    RequestAllocationDetails: {
      id: number
    }
  }
}
