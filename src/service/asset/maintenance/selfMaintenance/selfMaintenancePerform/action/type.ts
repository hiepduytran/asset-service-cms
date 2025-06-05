import { BaseResponse } from '@/service/type'

export type AutoMaintenanceError = {
  shiftSequenceId: number
  reasonError: string
  errorType: string
}

export type AutoMaintenanceApprove = {
  maintenanceShiftId: number
  sequences: {
    shiftSequenceId: number
    isConfirm: boolean
  }[]
  isBackUp: boolean | null
}

export type RequestBody = {
  PUT: {
    AutoMaintenanceError: AutoMaintenanceError
    AutoMaintenanceApprove: AutoMaintenanceApprove
  }
}

export type ResponseBody = {
  PUT: {
    AutoMaintenanceError: BaseResponse<{ id: number }>
    AutoMaintenanceApprove: BaseResponse<{ id: number }>
  }
}
