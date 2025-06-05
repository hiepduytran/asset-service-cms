import { BaseResponse } from '@/service/type'

export type MaintenanceScheduleIncidentAllocation = {
  id: number
  name: string
  sku: string
  code: string
}

export type IncidentRecordingMaintenanceAuto = {
  id: number
  code: string
  name: string
  reason: string
  severityManagement: {
    id: number
    name: string
    code: string
  }
  selfMaintenanceType: string | null
  incidentLocation: {
    id: number
    name: string
    sku: string
    code: string
  } | null
  recorder: {
    id: number
    name: string
    code: string
  }
  recordingTime: string
  actionType: string
  recordingStatus: string
  numberOfReviewType: string
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
  approveStatus: string | null
  maintenanceScheduleShiftId: number
}

export type ResponseBody = {
  GET: {
    MaintenanceScheduleIncidentAllocation: BaseResponse<
      MaintenanceScheduleIncidentAllocation[]
    >
  }
}
