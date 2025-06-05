import { BaseResponse } from '@/service/type'
export type AssetRecoverySave = {
  id?: number
  code: string
  updateDate: string
  collector: {
    id: number
    name: string
    code: string
  } | null
  allocationChooseType: string
  organization?: {
    id?: number
    name: string
  }
  department?: {
    id?: number
    name: string
    code: string
  }
  employee?: {
    id?: number
    name: string
    code: string
  }
  reasonRecall: {
    id?: number
    name: string
    code: string
  } | null
  feature: {
    id?: number
    name: string
    code: string
  } | null
  reference: {
    id?: number
    name: string
    code: string
  } | null
  note: string
  asset: {
    assetIdentity: {
      id?: number
      code: string
    } | null
    product: {
      id?: number
      name: string
      code: string
    } | null
    recordConditionType: string | null
    handlingPlanType: string | null
  }[]
}

export type ResponseBody = {
  ACTION: {
    AssetRecoverySave: BaseResponse<{
      id: number
    }>
  }
}
