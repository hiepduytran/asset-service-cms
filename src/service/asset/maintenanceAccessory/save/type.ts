export interface MaintenanceAccessorySave {
  id: number
  assetName: string | null
  product: Product | null
  imageUrls: string[] | null
  maintenanceItems: MaintenanceItem[] | null | []
  deleteItems: number[] | null
}

export interface Product {
  id: number
  name: string
  code: string
  imageUrls: string[]
}

export interface MaintenanceItem {
  accessory: Accessory | null
  maintenanceAccessoryChilds: MaintenanceAccessoryChilds[] | null
}

export interface Accessory {
  id: number
  name: string
  code: string
}

export interface MaintenanceAccessoryChilds {
  id: number | null
  category: Category | null
  product: Product2 | null
  quantity: number | null
  uom: Uom | null
}

export interface Category {
  id: number
  name: string
  code: string
}

export interface Product2 {
  id: number
  name: string
  code: string
}

export interface Uom {
  id: number
  name: string
  code: string
}


export type RequestBody = {
  POST: MaintenanceAccessorySave
}
