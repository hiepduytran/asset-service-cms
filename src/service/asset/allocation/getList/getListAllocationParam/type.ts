import { BaseResponse } from '@/service/type'

export type RequestParams = {
  GET: {
    allocationId: number
  }
}

export type AllocationParamList = {
  id: number
  code: string
  asset: {
    id: number
    name: string
    code: string
  }
  quantity: number
  inventoryQuantity: number
  staff: {
    id: number
    code: string
    lastName: string
    firstName: string
    name: string
  }
  uom: {
    id: number
    code: string
    name: string
  }
}

export type ResponseBody = {
  GET: {
    AllocationParamList: BaseResponse<AllocationParamList[]>
  }
}
