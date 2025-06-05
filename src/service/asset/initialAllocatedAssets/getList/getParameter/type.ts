import { BaseResponse } from '@/service/type'

export type InitialAllocationParameter = {
  id: number
  product: {
    id: number
    name: string
    code: string
  }
  quantity: number
  uom: {
    id: number
    code: string
    name: string
  }
  requestQuantity: number
  allocationLineMap: {
    id: number
    asset: {
      id: number
      code: string
      entity: {
        id: number
        name: string
        code: string
      }
      serial: {
        id: number
        name: string
        code: string
      }
      country: {
        id: number
        name: string
        code: string
      }
      partner: {
        id: number
        name: string
        code: string
      }
      producer: {
        id: number
        name: string
        code: string
      }
      orderDate: string
      startDate: string
      expiredLabel: string
      lot: {
        id: number
        name: string
        code: string
      }
      product: {
        id: number
        name: string
        sku: string
        uomId: number
        uomName: string
      }
    }
  }[]
}

export type Response = {
  GET: BaseResponse<InitialAllocationParameter[]>
}

export type RequestBody = {
  GET: {
    id: number
  }
}
