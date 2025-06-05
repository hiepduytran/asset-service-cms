import { BaseResponse } from '@/service/type'
import { StandardMethodGroup } from '../list/type'

export type DetailStandardDeclare = {
  id: number
  product: {
    id: number
    name: string
    sku: string
    itemQuantity: number
    imageUrls: string[]
    productId: number
  }
  standardMethodGroups: StandardMethodGroup[]
  name?: string
  state: string
}

export type ResDetailStandardDeclare = BaseResponse<DetailStandardDeclare>
