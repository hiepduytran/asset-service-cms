import { BaseResponse } from './../../../type/index'
export type DetailIncidentApprove = {
  id: number
  code: string
  name: string
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
  asset: {
    id: number
    name: string
    code: string
  }
  department: {
    id: number
    name: string
    code: string
  }
  recordingTime: string
  approveStatus: string
  incidentRecordingMaintenances: {
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
  }[]

  incidentRecordingMaintenancesLast: {
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
  }
}

export type IncidentApproveAction = {
  id: number
  status: string
  reason: string
  personApprove: {
    id: number
    name: string
    code: string
  }
}

export type Response = {
  DetailIncidentApprove: BaseResponse<DetailIncidentApprove>
  IncidentApproveAction: BaseResponse<{ id: number }>
}
