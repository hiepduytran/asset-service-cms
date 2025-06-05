import { InformationData } from '../../paramAsset/save/getListParamAsset/type'

export type OperateLine = {
  attributeCategory: {
    id: number
    name: string
    code: string
  }
  attributes: {
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
      id: string
      code: string
      name: string
    }
    expectedRealization: string
    value: string
    timeRecord: string
    actionRegulation: string
    content: string
    color: string
  }[]
}
export type ShutdownInformation = {
  startDate: string
  endDate: string
  stopTime: string
  reason: string
}

export type OperateSave = {
  code: string
  product: {
    id: number
    name: string
    code: string
    sku: string
  } | null
  asset: {
    id: number
    name: string
    code: string
  } | null
  assetName?: string
  shift: {
    id: number
    name: string
    code: string
  }
  user: {
    id: number
    name: string
    code?: string
  }
  productionRequest: {
    id: number
    name: string
    code: string
  }
  stage: {
    id: number
    name: string
    code: string
  }
  productArea: {
    id: number
    name: string
    code: string
  }
  updateDate: string
  note: string
  evaluateAsset: string
  conditionDescription: string
  operateLine: OperateLine[]
  incidentRecodingIds: number[]
  shutdownInformationIds: number[]
}

export type RequestBody = {
  SAVE: OperateSave
}
