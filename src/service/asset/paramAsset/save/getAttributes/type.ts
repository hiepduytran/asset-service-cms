import { PageResponse } from '@/service/type'
import { Attributes } from '../getListParamAsset/type'

export type AttributesList = Attributes

export type Response = {
  GET: PageResponse<AttributesList[]>
}

export type RequestBody = {
  GET: {
    search?: string | string
    page: number
    size: number
    assetId?: number
    categoryId?: number
  }
}
