import { BaseResponse } from '@/service/type'
import { IncidentRecordingMaintenance } from '../dialog/type'

export type IncidentDetail = {
  id?: number
  code: string
  recordDate: string
  recorder: {
    id: number
    name: string
    code: string
  } | null
  allocationChooseType: string
  org?: {
    id: number
    name: string
  }
  department?: {
    id: number
    name: string
    code: string
  }
  employee?: {
    id: number
    name: string
    code: string
  }
  reasonRecall: {
    id: number
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
    lineId?: number
    assetIdentity: {
      id: number
      name: string
      code: string
    } | null
    product: {
      id: number
      name: string
      code: string
    } | null
    productId?: number
    incidentRecodingIds: number[]
    recordConditionType: IncidentRecordingMaintenance[]
    recordConditionTypeAll: IncidentRecordingMaintenance[]
    recordConditionTypeStorage?: IncidentRecordingMaintenance[]

    // Lưu id những bản ghi đã được thêm mới , đánh giá lại
    recordConditionTypeSave?: number[]

    handlingPlanType: string
  }[]

  recordConditionTypeGetAll?: IncidentRecordingMaintenance[]
}

export type ResponseBody = {
  IncidentDetail: BaseResponse<IncidentDetail>
}
