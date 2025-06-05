import { BaseResponse } from '@/service/type'

export type RequestAllocationDetail = {
  id: number
  code: string
  requestDate: string
  updateDate: string
  planType: string
  plan: number
  allocationChooseType: string
  org: {
    id?: number
    name: string
  }
  department: {
    id?: number
    name: string
    code: string
  }
  employee: {
    id?: number
    name: string
    code: string
  }
  note: string
  status: string
  allocationStatus: string
  asset: {
    asset: {
      id?: number
      name: string
      code: string
    } | null
    quantity: number | null
    uom: {
      id?: number
      name: string
    } | null
    requestQuantity: number | null
  }[]
  cardId: number
}

export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<RequestAllocationDetail>
}
