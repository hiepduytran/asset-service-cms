import { BaseResponse } from '@/service/type'

type RequestAllocationDetail = {
  id?: number
  code: string
  requestDate: string
  updateDate: string
  planType: string
  plan: number
  allocationChooseType: string
  org: {
    id?: number
    name: string
    code: string
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
  status?: string
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
      code: string
    } | null
    requestQuantity: number | null
  }[]
}

export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<RequestAllocationDetail>
}
