import { BaseResponse } from '@/service/type'

export type RequestAllocationParameter = {
  asset: {
    id: number
    name: string
    code: string
  }
  requestQuantity: number
  allocatedQuantity: number | null
  allocationStatus: string
}

export type Response = {
  GET: BaseResponse<RequestAllocationParameter[]>
}

export type RequestBody = {
  GET: {
    allocationId: number
  }
}
