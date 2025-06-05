import { BaseResponse, PageResponse } from '@/service/type'
import { DetailProduct } from '../detail'
export type DetailListMaintenancesCard = {
  id: number
  code: string
  name: string
  sku: string
  nameProduct: string
  startDate: string
  state: string
}

export type DetailStandardMethod = {
  id: number
  name: string
  code: string
}
export type MaintenanceCardLine = {
  id: number
  standardGroup: {
    id: number
    name: string
    code: string
  }
  standardMaintenanceLinesLength: number
  standardMaintenanceLines: {
    product: {
      id: number
      sku: string
      name: string
      imageUrls: string[]
    } | null
    result: string
    standardMethods: DetailStandardMethod[] | null
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
    isView: boolean
  }[]
}
export type DetailMaintenancesCard = {
  id: number
  code: string
  name: string
  product: DetailProduct
  productName: string
  productImageUrls: string[]
  standardApplicableLine: {
    id: number
    name: string
    code: string
  }[]
  applicableDayOfWeeks: string[]
  startDate: string
  maintenanceCardLines: MaintenanceCardLine[]

  // Phần thêm để lấy dữ liệu
  standardMethodGroups?: DetailStandardMethodGroup[]
  isMon?: boolean
  isTue?: boolean
  isWed?: boolean
  isThu?: boolean
  isFri?: boolean
  isSat?: boolean
  isSun?: boolean
  state: string
}

export type DetailStandardMethodGroup = {
  standardGroup: {
    id: number
    name: string
    code: string
  }
  check: boolean
}

export type ListProductAndStandard = {
  id: number
  product: DetailProduct
  standardMethodGroups: DetailStandardMethodGroup[]
}

export type StandardByIds = {
  id: number
  product: DetailProduct
  standardMethodGroups: MaintenanceCardLine[]
}

export type Role = {
  id: number
  name: string
  code: string
}

export type Shifts = {
  id: number
  name: string
  code: string
}
export type ResponseBody = {
  GET: {
    MaintenanceCard: PageResponse<DetailListMaintenancesCard[]>
    ProductAndStandard: PageResponse<ListProductAndStandard[]>
    StandardByIds: BaseResponse<StandardByIds>
    Shifts: PageResponse<Shifts[]>
    StandardMethods: PageResponse<DetailStandardMethod[]>
    Roles: PageResponse<Role[]>
    // Accessory:
  }
}

export type RequestParams = {
  GET: {
    search: string
    state: string
    page: number
    size: number
  }
  Accessory: {
    productId: number
  }
}

export type RequestBody = {
  GET: {
    StandardByIds: {
      id: number
      groupStandardIds: {
        id: number
        name: string
        code: string
      }[]
    }
  }
  POST: {
    MaintenanceCard: DetailMaintenancesCard
  }
}
