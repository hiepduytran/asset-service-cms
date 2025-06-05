import { PageResponse } from '@/service/type'

export interface Asset {
    id: number
    code: string
    updatedAt: string
    uom: Uom
    assetType: string
    partner: string
    importWarehouse: ImportWarehouse
    product: Product
    images: string[]
  }
  
  export interface Uom {
    id: number
    code: string
    name: string
  }
  
  export interface ImportWarehouse {
    id: number
    name: string
    code: string
  }
  
  export interface Product {
    id: number
    name: string
    sku: string
    uomId: number
    uomName: string
  }
  

export type Response = {
    GET: PageResponse<Asset[]>
}

export type RequestBody = {
    GET: {
        search: string | null
    }
}