import { BaseResponse, PageResponse } from '@/service/type'
import {
  AuditFinalSequence,
  ShutdownInformation,
} from '../../selfMaintenanceCheck/detail/type'
export type SequenceDetail = {
  id: number
  sequence: number
  isConfirm: boolean
  isHasError: boolean
  errorType: string
  reasonError: string
  userUpdate: {
    id: number
    code: string
    name: string
    lastName: string
    firstName: string
  }
}
export type StandardLine = {
  accessory: {
    id: number
    name: string
  }
  role: {
    id: number
    name: string
  }
  result: string
  isActive: boolean
  sequenceList: SequenceDetail[]
  incidentRecording: {
    id: number
    code: string
    name: string
    reason: string
    severityManagement: null
    selfMaintenanceType: string
    incidentLocation: null
    recorder: null
    recordingTime: string
    actionType: string
    recordingStatus: null
    numberOfReviewType: string
    severityLevels: null
    isFinalReview: boolean
    approveStatus: string
    asset: null
    personApprove: null
    department: null
    maintenanceScheduleShiftId: number
  }
}
export type GroupStandard = {
  group: {
    id: number
    name: string
  }
  items: StandardLine[]
}
export type MaintenanceShift = {
  shift: {
    id: number
    name: string
  }
  statusShift: {
    role: {
      id: number
      name: string | null
      code: string
    }
    status: string
  }[]

  confirmStatus: {
    ratingId: number
    employee: {
      id: number
      name: string
      code: string
    }
    role: {
      id: number
      name: string
    }
    roleId: number
    status: string
    isApproveAll: boolean
    shutdownInformationResponse: ShutdownInformation
  }[]
  isShow: boolean
  groupStandard: GroupStandard[]
}

export type MaintenanceHistory = {
  date: string
  id: number
  asset: {
    id: number
    name: string
    code: string
  }
  department: {
    id: number
    name: string
  }

  currentShift: {
    id: number
    name: string
    startHour: string
  }
  maintenanceShifts: MaintenanceShift[]
}

// Convert type
export type SequenceDetailConvert = {
  sequenceListItem: SequenceDetail[]
  incidentRecording: {
    id: number
    code: string
    name: string
    reason: string
    severityManagement: null
    selfMaintenanceType: string
    incidentLocation: null
    recorder: null
    recordingTime: string
    actionType: string
    recordingStatus: null
    numberOfReviewType: string
    severityLevels: null
    isFinalReview: boolean
    approveStatus: string
    asset: null
    personApprove: null
    department: null
    maintenanceScheduleShiftId: number
  }
}
export type StandardLineConvert = {
  accessory: {
    id: number
    name: string
  }
  result: string
  role: {
    id: number
    name: string
  }
  isActive: boolean
  sequenceList: SequenceDetailConvert[]
  incidentRecording: {
    id: number
    code: string
    name: string
    reason: string
    severityManagement: null
    selfMaintenanceType: string
    incidentLocation: null
    recorder: null
    recordingTime: string
    actionType: string
    recordingStatus: null
    numberOfReviewType: string
    severityLevels: null
    isFinalReview: boolean
    approveStatus: string
    asset: null
    personApprove: null
    department: null
    maintenanceScheduleShiftId: number
  }
}
export type GroupStandardConvert = {
  group: {
    id: number
    name: string
  }
  items: StandardLineConvert[]
}
export type MaintenanceShiftConvert = {
  shift: {
    id: number
    name: string
  }[]

  currentRole: {
    id: number
    name: string
  }[]
  statusShift: {
    role: {
      id: number
      name: string | null
    }
    status: string
  }[][]
  confirmStatus: {
    ratingId: number
    employee: {
      id: number
      name: string
      code: string
    }
    role: {
      id: number
      name: string
    }
    roleId: number
    status: string
    isApproveAll: boolean
    shutdownInformationResponse: ShutdownInformation
  }[][]
  isShow: boolean[]
  groupStandard: GroupStandardConvert[]
}
export type MaintenanceHistoryConvert = {
  incidentLocationId?: number | null
  incidentLocation?: number | null

  severityManagementId?: number | null
  severityManagement?: number

  isHandle?: boolean | null
  date?: string
  startDate?: string
  endDate?: string
  page: number
  size: number
  around?: string

  id: number

  maintenanceCard: {
    id: number
    name: string
    code: string
  }

  asset: {
    id: number
    code: string
  }

  currentShift: {
    id: number
    name: string
    startHour: string
  }

  maintenanceShifts: MaintenanceShiftConvert[]

  // Trường thêm
  auditFinalSequence?: AuditFinalSequence[]
}

export type AutoMaintenanceError = {
  shiftSequenceId: number
  reasonError: string
  errorType: string
}

export type MaintenanceHistoryIncident = {
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
      id: 1
      name: string
      code: string
    }
    numberOfReviewType: string
  }[]

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
  note: string
  isHandle: boolean
}
export type ResponseBody = {
  GET: {
    AutoMaintenanceError: BaseResponse<AutoMaintenanceError>
    MaintenanceHistory: BaseResponse<MaintenanceHistory>
    MaintenanceHistoryIncident: PageResponse<MaintenanceHistoryIncident[]>
  }
}
