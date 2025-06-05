import { BaseResponse, PageResponse } from './../../../../../type/index'

export type ListAutoMaintenance = {
  id: number
  asset: {
    id: number
    code: string
  }
  product: {
    id: number
    name: string
    sku: string
    code: string
    uomId: number
    uomName: string
    category: {
      id: number
      name: string
      code: string
    }
    productCategory: {
      id: number
      name: string
      code: string
      sku: string
      departmentId: number
      category: {
        id: number
        name: string
        code: string
      }
      informationData: {
        attributeCategory: {
          id: number
          name: string
          code: string
        }
        attributes: {
          attribute: {
            id: number
            name: string
            code: string
          }
          attributeValue: {
            id: number
            name: string
            code: string
          }[]

          isParameter: boolean
          minimum: number
          maximum: number
          uom: {
            id: number
            code: string
            name: string
          }
          lineId: number
        }[]
      }[]
    }
    imageUrls: string[]
  }
  department: {
    id: number
    name: string
    code: string
  }
  maintenanceDate: string
  shift: {
    id: number
    name: string
    startHour: {
      hour: number
      minute: number
      second: number
      nano: number
    }
    endHour: {
      hour: number
      minute: number
      second: number
      nano: number
    }
  }
  progress: string
  testStatus: string
}

export type MaintenanceScheduleIncidentAllocation = {
  id: number
  name: string
  sku: string
  code: string
}

export type RequestParams = {
  ListAutoMaintenance: {
    search?: string
    page: number
    size: number
    departmentIds?: number[]
    department?: {
      id: number
      code: string
      name: string
    }[]
  }
}

export type ResponseBody = {
  GET: {
    ListAutoMaintenance: PageResponse<ListAutoMaintenance[]>
    MaintenanceScheduleIncidentAllocation: BaseResponse<
      MaintenanceScheduleIncidentAllocation[]
    >
  }
}
