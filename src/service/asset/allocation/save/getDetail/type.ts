import { BaseResponse } from '@/service/type'

type AssetAllocationDetail = {
  id: number
  code: string
  department: {
    id: number
    name: string
    code: string
  }
  dispenser: {
    id: number
    username: string
    code: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
  }
  productArea: {
    id: number
    name: string
    code: string
  }
  stage: {
    id: number
    name: string
    code: string
  }
  requestDate: Date
  desiredAllocationDate: Date
  status: string
  assetAllocationLine: [
    {
      id: number
      asset: {
        id: number
        name: string
        code: string
      }
      manager: {
        id: number
        code: string
        lastName: string
        firstName: string
        name: string
      }
      quantity: number
      uom: {
        id: number
        code: string
        name: string
      }
      requestQuantity: number
      allocationLineMap: [
        {
          id: number
          asset: {
            id: number
            name: string
            code: string
          }
        }
      ]
    }
  ]
  source: string
  reason: string
}

export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<AssetAllocationDetail>
}
