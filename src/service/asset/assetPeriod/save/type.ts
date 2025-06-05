export interface AssetPeriodSave {
  id: number | null
  assetName: string | null
  product: Product | null
  period: number | null
  periodType: string | null
  frequency: number | null
  frequencyType: string | null
  assetPeriodLines: AssetPeriodLine[]
}

export interface Product {
  id: number
  name: string
  code: string
  imageUrls: string[]
}

export interface AssetPeriodLine {
  assetAccessoryLine: AssetAccessoryLine
  period: number | null
  periodType: string
  frequency: number | null
  frequencyType: string
}

export interface AssetAccessoryLine {
  id: number
  name: string
  code: string
}


export type RequestBody = {
  POST: AssetPeriodSave
}
