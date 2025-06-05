import { BaseResponse, PageResponse } from '@/service/type'
export type IncidentLogListTime = {
  id: number
  source: string
  date: string
  code: string
  allocationChooseType: string
  org: string
  department: string
  employee: string
  quantity: number
}
export type IncidentLogListTimeDetail = {
  id: number
  code: string
  sku: string
  name: string
  status: string
}

export type IncidentLogListIdentity = {
  id: number
  updateDate: string
  source: string
  code: string
  assetCode: string
  productCode: string
  productName: string
  assetStatus: string
  approveStatus: string
}

export type RequestParams = {
  LIST: {
    IncidentLogListTime: {
      search?: string
      date?: string
      page: number
      size: number
    }
    IncidentLogListIdentity: {
      search?: string
      date?: string
      page: number
      size: number
    }
  }
}

export type IncidentRecordingMaintenance = {
  id: number
  code: string
  name: string
  reason: string
  severityManagement: {
    id: number
    name: string
    code: string
  }
  selfMaintenanceType: string
  incidentLocation: {
    id: number
    name: string
    code: string
  } | null
  recorder: {
    id: number
    code: string
    lastName: string
    firstName: string
    name: string
  }
  recordingTime: string
  actionType: string
  recordingStatus: string
  numberOfReviewType: string
  departmentId: number | null
  severityLevels: {
    severityManagement: {
      id: number
      name: string
      code: string
    }
    numberOfReviewType: string
  }[]
  asset?: {
    id: number
    code: string
    name: string
  }
  isFinalReview: boolean
  approveStatus: string
}

export type ResponseBody = {
  LIST: {
    IncidentLogListTime: PageResponse<IncidentLogListTime[]>
    IncidentLogListTimeDetail: BaseResponse<IncidentLogListTimeDetail[]>
    IncidentLogListIdentity: PageResponse<IncidentLogListIdentity[]>
    IncidentRecordingMaintenance: PageResponse<IncidentRecordingMaintenance[]>
    AllIncidentRecordingMaintenance: PageResponse<
      IncidentRecordingMaintenance[]
    >
  }
}
