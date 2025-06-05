import { PageResponse } from '@/service/type'
// Asset Code
export type AssetDeclarationCategoryList = {
  id: number
  name: string
  sku: string
  productCategory: {
    id: number
    name: string
    code: string
  }
  uom: {
    id: number
    name: string
    code: string
  }
  quantityIdentified: number
  quantityUnidentified: number
  quantityPickIn: number
  quantityAllocated: number
  isConfig: boolean
  checkingType: string
}

export type Response = {
  GET: PageResponse<AssetDeclarationCategoryList[]>
}

export type RequestBody = {
  GET: {
    search?: string
    categoryId?: number | null
    isConfig?: boolean | null
    page?: number
    size?: number
  }
}

// Identifier Code
export type AssetDeclarationCategoryListIdentifierCode = {
  id: number
  code: string
  entity: {
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
  product: {
    id: number
    name: string
    sku: string
    uomId: number
    uomName: string
  }
  category: {
    id: number
    name: string
    code: string
  }
  uom: {
    id: number
    name: string
    code: string
  }
  isActive: true
  allocationChooseType: string
  organization: {
    id: number
    name: string
    code: string
  }
  department: {
    id: number
    name: string
    code: string
  }
  employee: {
    id: number
    code: string
    lastName: string
    firstName: string
    name: string
  }
}

export type ResponseIdentifierCode = {
  GET: PageResponse<AssetDeclarationCategoryListIdentifierCode[]>
}

export type RequestBodyIdentifierCode = {
  GET: {
    search?: string
    categoryId?: number | null
    isConfig?: boolean | null
    page?: number
    size?: number
  }
}
