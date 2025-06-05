import { BaseResponse } from '@/service/type'

export type ProductAttributes = {
  attributeCategory: {
    id: number
    name: string
  }
  attributes: {
    attribute: {
      id: number
      name: string
    }
    attributeValue: {
      id: number
      name: string
    }
    type: string
  }[]
}

export type Response = {
  GET: BaseResponse<ProductAttributes[]>
}
export type RequestParams = {
  GET: {
    attributeCategoryIds: number
  }
}
