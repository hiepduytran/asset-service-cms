export type ImpactLevelConfiguration = {
  startValue: number
  endValue: number
  content: string
  color: string
  actionRegulation: string
}

export type Attributes = {
  attribute: {
    id: number
    name: string
    code: string
  }
  attributeValue: {
    id: number
    name: string
    code: string
  }[]
  isParameter: boolean
  uom: {
    id?: number | null
    code: string
    name: string
  } | null
  isWarning: boolean
  minimum: number
  maximum: number
  impactMinimum: ImpactLevelConfiguration[]
  impactStandard: ImpactLevelConfiguration[]
  impactMaximum: ImpactLevelConfiguration[]
}

export type AssetCategory = {
  attributeCategory: {
    id: number
    name: string
    code: string
  }
  size: number
  attributes: Attributes[]
}

export type TrackAssetLine = {
  assetCategory: AssetCategory[]
}

export type ParamAssetSave = {
  product: {
    id: number
    name: string
    code: string
  } | null
  asset: {
    id: number
    name: string
    code: string
  } | null
  assetName: string
  category: {
    id: number
    name: string
    code: string
  }
  categoryName: string
  trackAssetLine: TrackAssetLine[]
}

export type RequestBody = {
  POST: ParamAssetSave
}
