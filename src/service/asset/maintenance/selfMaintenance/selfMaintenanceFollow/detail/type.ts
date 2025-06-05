import { BaseResponse } from '@/service/type'
export type DetailMaintenancesCard = {
  id: number
  code: string
  name: string
  checkApproveLevel: string
  checkAccountLevel: string
  product: {
    id: number
    sku: string
    name: string
    imageUrls: string[]
  }
  standardMaintenanceId: number
  standardApplicableLine: {
    id: number
    name: string
    code: string
  }[]
  applicableDayOfWeeks: string[]
  state: string
  startDate: string
  maintenanceCardLines: {
    id: number
    standardGroup: {
      id: number
      name: string
      code: string
    }
    standardMaintenanceLines: {
      product: {
        id: number
        sku: string
        name: string
        imageUrls: string[]
      }
      result: string
      standardMethods: {
        id: number
        name: string
        code: string
      }[]
      groupStaff: {
        id: number
        name: string
        code: string
      }
      auditGroupStaffFirst: {
        id: number
        name: string
        code: string
      }
      auditGroupStaffSecond: {
        id: number
        name: string
        code: string
      }
      shifts: {
        id: number
        name: string
        code: string
      }[]
      frequency: number
      frequencyType: string
      note: string
    }[]
  }[]
}
export type Response = {
  GET: {
    DetailMaintenancesCard: BaseResponse<DetailMaintenancesCard>
  }
}
