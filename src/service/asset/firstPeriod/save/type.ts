export interface FirstPeriodSave {
  id: number
  asset: Asset | null
  assetName: string | null
  lastMaintenanceDate: string | null
  assetFirstPeriodLines: AssetFirstPeriodLine[] | null
  amount: number
}

export interface Asset {
  id: number
  code: string
  name: string
  product: Product
  images: string[]
}

export interface AssetFirstPeriodLine {
  id: number
  lastMaintenanceDate: string | null
  name: string
  sku: string
}

export interface Product {
  id: number
  name: string
  sku: string
  uomId: number
  uomName: string
}


export type RequestBody = {
  POST: FirstPeriodSave
}
