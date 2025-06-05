import { BaseResponse } from '@/service/type'

type AssetDetail = {
  id?: number | null
  code: string
  name: string
  entity: {
    id: number | null
    name: string
  }
  productId: number
  serial: {
    id: number | null
    name: string
  }
  year: number
  country: {
    id: number | null
    name: string
  }
  partner: string
  producer: {
    id: number
    name: string
    code: string
  }
  orderDate: string
  startDate: string
  endDate: string
  expiredLabel: string
  images: [string]
  parentId: number | null

  insurances: {
    startDate: string
    endDate: string
    expiredLabel: string
    documentImages: Array<{
      name: string
      url: string
    }>
  }

  recordses: {
    documentImages: Array<{
      name: string
      url: string
    }>
  }

  warranties: {
    startDate: string
    endDate: string
  }

  depreciations: {
    method: string
    startDate: string
    endDate: string
  }

  isInsurance: boolean
  isDepreciation: boolean
  isWarranty: boolean
  isRecords: boolean
  isMaintenance: boolean
  assetType: string
  informationData:
    | {
        attributeCategory: {
          id: number | null
          name: string
        }
        attributes: {
          attribute: {
            id: number | null
            name: string
          }
          attributeValue: {
            id: number | null
            name: string
          }
          isParameter: boolean
        }[]
      }[]
    | null
}

export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<AssetDetail>
}
