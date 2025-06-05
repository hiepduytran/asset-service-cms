import { PageResponse } from '@/service/type'

export type Attributes = {
  attribute: {
    id: number
    name: string
    code: string
  }
  attributeValue: {
    id: number
    name: string
    code: string
  }[]
  quantity: number
  minimum: number
  maximum: number
  isParameter: boolean
  uom: {
    id: string
    code: string
    name: string
  }
  lineId: number
}

export type InformationData = {
  attributeCategory: {
    id: number
    name: string
    code: string
  }
  attributes: Attributes[]
}

export type ParamAsset = {
  id: number
  name: string
  code: string
  informationData: InformationData[]
}

export type Response = {
  GET: PageResponse<ParamAsset[]>
}

export type RequestBody = {
  GET: {
    search?: string | string
    page: number
    size: number
  }
}
