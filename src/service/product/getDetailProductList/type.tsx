import { BaseResponse } from '@/service/type'

export type ProductDetail = {
  id?: number | null
  hasVariant: true
  sku: string
  name: string
  attributeCategory: {
    id?: number | null
    name: string
    sequence: number
    attributeOutputDtos: {
      id?: number | null
      creationMode: string
      name: string
      code: string
      sequence: number
      attributeCategorySequence: number
      attributeCategoryId?: number | null
      viewType: string
      displayType: string
      description: string
      companyId?: number | null
      orgId?: number | null
      productAttributeCategory: {
        id?: number | null
        code: string
        name: string
        description: string
        sequence: number
        activated: true
        companyId?: number | null
        orgId?: number | null
        isInternal: true
        attributeOutputList: [string]
        createdAt: string
        createdBy: number
        userCreatedBy: {
          id?: number | null
          code: string
          name: string
        }
        isUsing: true
      }
      productAttributeValue: {
        id?: number | null
        sequence: number
        value: string
        companyId?: number | null
        orgId?: number | null
        productAttributeId?: number | null
        isDelete: true
        picked: true
        activated: true
      }[]
      activated: true
      createdAt: string
      createdBy: number
      userCreatedBy: {
        id?: number | null
        code: string
        name: string
      }
      isUsing: true
      sequenceOfCategory: number
    }[]
  }[]
}

export type Response = {
  GET: BaseResponse<ProductDetail>
}

export type RequestParams = {
  GET: {
    productId: number
  }
}
