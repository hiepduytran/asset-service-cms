import { BaseResponse } from '@/service/type'

export interface MaintenanceAccessoryDetail {
  id: number
  product: Product
  maintenanceItems: MaintenanceItem[]
  deleteItems: number[]
}

export interface Product {
  id: number
  sku: string
  name: string
  imageUrls: string[]
}

export interface MaintenanceItem {
  accessory: Accessory
  maintenanceAccessoryChilds: MaintenanceAccessoryChilds[]
}

export interface Accessory {
  id: number
  name: string
  code: string
}

export interface MaintenanceAccessoryChilds {
  id: number
  category: Category
  product: Product2
  quantity: number
  uom: Uom
}

export interface Category {
  id: number
  name: string
  code: string
}

export interface Product2 {
  id: number
  sku: string
  name: string
  imageUrls: string[]
}

export interface Uom {
  id: number
  name: string
  code: string
}

export type RequestParams = {
  GET: { maintenanceAccessoryId: number }
}

export type Response = {
  GET: BaseResponse<MaintenanceAccessoryDetail>
}
