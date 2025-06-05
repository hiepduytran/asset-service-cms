import { BaseResponse } from '@/service/type'

export type RequestBody = {
  PUT: {
    AuditMaintenanceApprove: {
      maintenanceScheduleId: number
      maintenanceShiftId: number
      severityManagement?: {
        id: number
        code: string
        name: string
      }
      confirmList: {
        groupStandardId: number
        sequenceId: number
        isConfirm: boolean
        isHasError: boolean
        reasonError: string
        errorType: string
      }[]
    }
    AuditMaintenanceApproveError: {
      maintenanceScheduleId: number
      maintenanceShiftId: number
      sequenceId: number
      isFinalError: boolean | null
      finalErrorType: string
      finalReasonError: string
    }

    AuditMaintenanceConfirmAgain: {
      maintenanceScheduleId: number
      maintenanceShiftId: number
      confirmList: {
        groupStandardId: number
        sequenceId: number
        isConfirm: boolean
      }[]
    }
  }
}

export type DialogPauseMachine = {
  code: string
  startDate: string
  endDate: string
  selfMaintenanceType: string
  incidentRecoding: {
    id: number
    code: string
    name: string
  }[]
  reason: string
  asset?: {
    id: number
    code: string
  }
  // finalStatus: string
  severityManagement?: {
    id: number
    code: string
    name: string
  }
  maintenanceScheduleShiftId?: number
}

export type ResponseBody = {
  PUT: {
    AuditMaintenanceApprove: BaseResponse<{ id: number }>
    AuditMaintenanceApproveError: BaseResponse<{ id: number }>
    AuditMaintenanceConfirmAgain: BaseResponse<{ id: number }>
  }
}
