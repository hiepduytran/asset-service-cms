import { BaseResponse, PageResponse } from '@/service/type'

export type RequestBody = {
  GET: {
    page?: number
    size?: number
    productId?: number
    search?: string
    state?: 'DRAFT' | 'PENDING' | 'APPROVED' | null
  }
  POST: {
    product: {
      id?: number
      name: string
      sku?: string
      itemQuantity: number
      imageUrls: string[]
      productId: number
    }
    state: 'DRAFT' | 'PENDING' | 'APPROVED'
    standardMethodGroups: StandardMethodGroup[]
  }
}

export type ListStandardMaintenance = {
  id: number
  product: {
    id: number
    name: string
    sku: string
    uomId: number
    uomName: string
    productCategory: null
    imageUrls: string[]
  }
  state: 'DRAFT' | 'PENDING' | 'APPROVED'
}

export type DetailAssetAccessory = {
  id: number
  uom: {
    id: number
    name: string
  }
  name: string
  sku: string
  uomId: number
  uomName: string
  checkingType: string
  productTemplateId: number
  productTemplateSku?: null
  productCategoryId?: null
  productCategoryName?: null
  isCategoryDefault?: null
  isInternal: boolean
  isMaterial: boolean
  isGoods: boolean
  isSemiFinished: boolean
  isOEM: boolean
  vendors?: any[]
  brand?: null
  imageUrls?: any[]
  description?: null
}

export type DetailAccessory = {
  id?: number
  name: string
  code: string
}

export type DetailStandardMethod = {
  id?: number
  code: string
  name: string
  groupStandard: {
    id: number
    name: string
    code: string
  }
  product: null
  isActive: boolean
}

export type StandardGroup = {
  id: number
  code: string
  name: string
}

export type StandardMaintenanceLine = {
  id: number | null
  product: DetailAccessory | null
  standardMethods: DetailStandardMethod[] | null
  result: string | null
}
export type StandardMethodGroup = {
  standardGroup: StandardGroup
  standardMaintenanceLines: StandardMaintenanceLine[]
}

export type DetailRole = {
  id: number
  code: string
  name: string
}

export type Response = {
  GET: {
    standardMaintenance: PageResponse<ListStandardMaintenance[]>
    assetAccessory: PageResponse<DetailAssetAccessory[]>
    accessory: PageResponse<DetailAccessory[]>
    standardMethods: PageResponse<DetailStandardMethod[]>
    groupStandard: BaseResponse<StandardGroup[]>
    role: BaseResponse<DetailRole[]>
  }
}
