import { BaseResponse } from '@/service/type'

// data từ API
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
  result: string
  role: {
    id: number
    name: string
  }
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
export type MaintenanceShiftAudit = {
  shift: {
    id: number
    name: string
  }
  isApproveConfirm: boolean
  isShow: boolean
  incidentRecording: IncidentRecordingMaintenanceAudit
  statusShift: {
    employee: {
      id: number
      name: string
      code: string
      userId: number
    }

    status: string
    shutdownInformationResponse: {
      id: number
      code: string
      reason: string
    }
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
    severityManagement: {
      id: number
      code: string
      name: string
    }
    isApproveAll: boolean
    shutdownInformationResponse: ShutdownInformation
  }[]
  status: string
  auditStaff: {
    id: number
    name: string
  } | null
  auditStatus: {
    id: number
    name: string
  } | null
  groupStandard: GroupStandard[]
}
export type AuditMaintenance = {
  id: number
  dayOfWeek: string
  currentShift: {
    id: number
    name: string
    startHour: string
  }
  currentRole: {
    id: number
    name: string
    code: string
  }
  isShowDetail: boolean
  product: {
    id: number
    name: string
  }
  asset: {
    id: number
    code: string
  }
  maintenanceCard: {
    id: number
    name: string
  }
  department: {
    id: number
    name: string
  }
  maintenanceShiftAudits: MaintenanceShiftAudit[]

  // Trường thêm
  severityManagement?: {
    id: number
    code: string
    name: string
  }
  errorDangerDate?: string
  isShowIndex?: number
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
  role: {
    id: number
    name: string
  }
  result: string
  isActive: boolean
  sequenceList: SequenceDetailConvert[]
}
export type GroupStandardConvert = {
  group: {
    id: number
    name: string
  }
  items: StandardLineConvert[]
}
export type MaintenanceShiftAuditConvert = {
  shift: {
    id: number
    name: string
  }[]
  isApproveConfirm: boolean[]
  isShow: boolean[]
  incidentRecording: IncidentRecordingMaintenanceAudit[]
  statusShift: {
    employee: {
      id: number
      name: string
      code: string
      userId: number
    }
    status: string
    shutdownInformationResponse: {
      id: number
      code: string
      reason: string
    }
  }[][]
  confirmStatus: {
    ratingId: number
    employee: {
      id: number
      name: string
      code: string
      userId: number
    }
    role: {
      id: number
      name: string
    }
    roleId: number
    status: string
    severityManagement: {
      id: number
      code: string
      name: string
    }
    isApproveAll: boolean
    shutdownInformationResponse: ShutdownInformation
  }[][]
  auditStaff:
    | {
        id: number
        name: string
      }[]
    | null
  auditStatus:
    | {
        id: number
        name: string
      }[]
    | null
  groupStandard: GroupStandardConvert[]
}

export type AuditMaintenanceConvert = {
  id: number
  dayOfWeek: string
  currentShift: {
    id: number
    name: string
    startHour: string
    endHour: string
  }
  currentRole: {
    id: number
    name: string
    code: string
  }
  isShowDetail: boolean
  product: {
    id: number
    name: string
  }
  asset: {
    id: number
    code: string
  }
  maintenanceCard: {
    id: number
    name: string
  }
  department: {
    id: number
    name: string
  }
  maintenanceShiftAudits: MaintenanceShiftAuditConvert[]

  // Trường thêm
  severityManagement?: {
    id: number
    code: string
    name: string
  }
  auditFinalSequence?: AuditFinalSequence[]
  confirmList?: {
    groupStandardId: number
    sequenceId: number
    isConfirm: boolean
    isHasError: boolean
    reasonError: string
    errorType: string
    userUpdate: {
      id: number
      code: string
      name: string
    }
  }[]
  confirmListBack?: AuditFinalSequence[]
  isShowIndex?: number

  recordConditionType?: IncidentRecordingMaintenanceAudit[]
  recordConditionTypeReview?: IncidentRecordingMaintenanceAudit[]
  recordConditionTypeSave?: number[]
}

export type ShutdownInformation = {
  id: number
  code: string
  startDate: string
  endDate: string
  reason: string
}

export type RequestParams = {
  GET: {
    maintenanceShiftId: number
  }
}

export type AuditMaintenanceDetail = {
  role: string
  status: string
  detail: AuditFinalSequence[]
}

export type AuditFinalSequence = {
  group: {
    id: number
    name: string
  }
  items: StandardLine[]
}

export type AuditDialog = {
  auditFinalSequence: AuditFinalSequence[]

  // Trường thêm
  confirmList?: {
    groupStandardId: number
    sequenceId: number
    isHasError: boolean
    isConfirm: boolean
    errorType: string
    reasonError: string
  }[]
}

export type AutoMaintenanceError = {
  id: number
  sequence: number
  isConfirm: boolean
  isHasError: boolean
  errorType: string
  reasonError: string
}

export type InfoUser = {
  id: number
  imageUrl: string
  code: string
  lastName: string
  firstName: string
  department: {
    id: number
    name: string
    code: string
  }
  position: {
    id: number
    name: string
    code: string
  }
  parentDepartment: {
    id: number
    name: string
    code: string
  }
  birthday: string
  gender: string
  phoneNumber: string
  email: string
  activated: true
  departmentId: number
  positionId: number
  name: string
  departments: {
    id: number
    name: string
    code: string
  }[]

  positions: {
    id: number
    name: string
    code: string
  }[]

  userId: number
}

export type IncidentRecordingMaintenanceAudit = {
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
    AuditMaintenances: BaseResponse<AuditMaintenance>
    AuditMaintenanceDetail: BaseResponse<AuditMaintenanceDetail>
    AuditFinalSequence: BaseResponse<AuditFinalSequence[]>
    AutoMaintenanceError: BaseResponse<AutoMaintenanceError>
    InfoUser: BaseResponse<InfoUser>
  }
}
