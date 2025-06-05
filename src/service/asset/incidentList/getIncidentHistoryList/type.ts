import { PageResponse } from '@/service/type'

export type IncidentHistoryList = {
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
  severityLevels: [
    {
      severityManagement: {
        id: number
        name: string
        code: string
      }
      numberOfReviewType: string
    }
  ]
  isFinalReview: true
  approveStatus: string
  asset: {
    id: number
    name: string
    code: string
  }
  personApprove: {
    id: number
    code: string
    lastName: string
    firstName: string
    name: string
  }
  department: {
    id: number
    name: string
    code: string
  }
  maintenanceScheduleShiftId: number
}

export type Response = {
  GET: PageResponse<IncidentHistoryList[]>
}

export type RequestBody = {
  GET: {
    search?: string
    assetId?: number | null
    departmentId?: number | null
    department?: {
      id: number | null
      code: string
      name: string
    }
    severityManagementId?: number | null
    severityManagement: {
      id: number | null
      code: string
      name: string
    }
    isHandle?: boolean | null
    page?: number
    size?: number
  }
}
