import { BaseResponse } from '@/service/type'

export type IncidentReportParameter = {
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
  }
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
  severityLevels: {
    severityManagement: {
      id: number
      name: string
      code: string
    }
    numberOfReviewType: string
  }[]
  isFinalReview: boolean
}

export type Response = {
  GET: BaseResponse<IncidentReportParameter[]>
}

export type RequestBody = {
  GET: {
    id: number
  }
}
