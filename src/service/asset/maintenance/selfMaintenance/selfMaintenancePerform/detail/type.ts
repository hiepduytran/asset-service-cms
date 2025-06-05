import { BaseResponse } from '@/service/type'
import { IncidentRecordingMaintenanceAuto } from '../dialog/type'
import { ShutdownInformation } from '../../selfMaintenanceCheck/detail/type'

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
export type MaintenanceShiftAuto = {
  id: number
  shift: {
    id: number
    name: string
  }
  incidentRecording: IncidentRecordingMaintenanceAuto
  statusShift: {
    user: {
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

export type AutoMaintenance = {
  id: number
  dayOfWeek: string
  currentShift: {
    id: number
    name: string
  }
  product: {
    id: number
    name: string
    code: string
  }
  asset: {
    id: number
    code: string
    name: string
  }
  maintenanceCard: {
    id: number
    code: string
    name: string
  }
  department: {
    id: number
    code: string
    name: string
  }
  currentRole: {
    id: number
    name: string
    code: string
  }
  isAuthor: boolean
  maintenanceShifts: MaintenanceShiftAuto[]

  // Trường thêm
  status?: string
  sequences?: {
    shiftSequenceId: number
    isConfirm: boolean
  }[]
  maintenanceShiftId?: number[]
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
  result: string
  role: {
    id: number
    name: string
  }
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
export type MaintenanceShiftConvert = {
  shift: {
    id: number
    name: string
  }[]
  incidentRecording: IncidentRecordingMaintenanceAuto[]
  statusShift: {
    user: {
      id: number
      name: string | null
      code: string
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
export type AutoMaintenanceConvert = {
  id: number
  dayOfWeek: string
  currentShift: {
    id: number
    name: string
  } | null
  product: {
    id: number
    code: string
    name: string
  } | null
  asset: {
    id: number
    code: string
    name: string
  }
  maintenanceCard: {
    id: number
    code: string
    name: string
  } | null
  department: {
    id: number
    code: string
    name: string
  } | null
  currentRole: {
    id: number
    name: string
    code: string
  }
  isAuthor: boolean
  maintenanceShifts: MaintenanceShiftConvert[] | []

  // Trường thêm
  status?: string
  sequences: {
    shiftSequenceId: number
    isConfirm: boolean
    isHasError: boolean
    reasonError: string
    errorType: string
  }[]
  maintenanceShiftId?: number[]
  isShowIndex?: number
  recordConditionType?: IncidentRecordingMaintenanceAuto[]
  recordConditionTypeReview?: IncidentRecordingMaintenanceAuto[]
  recordConditionTypeSave?: number[]
}

export type ResponseBody = {
  GET: {
    AutoMaintenance: BaseResponse<AutoMaintenance>
  }
}
