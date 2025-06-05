import { BaseResponse } from '@/service/type'

export type ApproveConfigSave = {
  assetSelfMaintainStandard: {
    level1: {
      groupStaff: {
        id: number
        name: string
        code: string
      } | null
      approveConfigType?: string
      approveLevel: string
      isActive: boolean
    } | null
    level2: {
      groupStaff: {
        id: number
        name: string
        code: string
      } | null
      approveConfigType?: string
      approveLevel: string
      isActive: boolean
    } | null
  }
  selfMaintainVoucher: {
    level1: {
      groupStaff: {
        id: number
        name: string
        code: string
      } | null
      approveConfigType?: string
      approveLevel: string
      isActive: boolean
    } | null
    level2: {
      groupStaff: {
        id: number
        name: string
        code: string
      } | null
      approveConfigType?: string
      approveLevel: string
      isActive: boolean
    } | null
  }
  weeklyPlan: {
    level1: {
      groupStaff: {
        id: number
        name: string
        code: string
      } | null
      approveConfigType?: string
      approveLevel: string
      isActive: boolean
    } | null
    level2: {
      groupStaff: {
        id: number
        name: string
        code: string
      } | null
      approveConfigType?: string
      approveLevel: string
      isActive: boolean
    } | null
  }
  emergingWeeklyPlan: {
    level1: {
      groupStaff: {
        id: number
        name: string
        code: string
      } | null
      approveConfigType?: string
      approveLevel: string
      isActive: boolean
    } | null
    level2: {
      groupStaff: {
        id: number
        name: string
        code: string
      } | null
      approveConfigType?: string
      approveLevel: string
      isActive: boolean
    } | null
  }
  annualPlan: {
    level1: {
      groupStaff: {
        id: number
        name: string
        code: string
      } | null
      approveConfigType?: string
      approveLevel: string
      isActive: boolean
    } | null
    level2: {
      groupStaff: {
        id: number
        name: string
        code: string
      } | null
      approveConfigType?: string
      approveLevel: string
      isActive: boolean
    } | null
  }
  emergencyFix: {
    level1: {
      groupStaff: {
        id: number
        name: string
        code: string
      } | null
      approveConfigType?: string
      approveLevel: string
      isActive: boolean
    } | null
    level2: {
      groupStaff: {
        id: number
        name: string
        code: string
      } | null
      approveConfigType?: string
      approveLevel: string
      isActive: boolean
    } | null
  }
  regularMaintenance: {
    level1: {
      groupStaff: {
        id: number
        name: string
        code: string
      } | null
      approveConfigType?: string
      approveLevel: string
      isActive: boolean
    } | null
    level2: {
      groupStaff: {
        id: number
        name: string
        code: string
      } | null
      approveConfigType?: string
      approveLevel: string
      isActive: boolean
    } | null
  }
}

export type RequestBody = {
  POST: ApproveConfigSave
}

export type Response = {
  GET: BaseResponse<ApproveConfigSave>
}

