import { BaseResponse } from '@/service/type'

export type ParameterConfig = {
  id: number | null
  name: string
  sku: string
  parameter: string
  informationData: {
    attributeCategory: {
      id: number
      name: string
      code?: string
    }
    attributes: {
      attribute: {
        id: number
        name: string
        code: string
      }
      attributeValue: {
        id: number
        name: string
        code?: string
      }[]
      isParameter: boolean
    }[]
  }[]
}

export type RequestParams = {
  GET: { productId: number }
}

export type Response = {
  GET: BaseResponse<ParameterConfig>
}

export type RequestBody = {
  POST: ParameterConfig
}
