import { AuditFinalSequence } from '../detail/type'
import { BaseResponse, PageResponse } from './../../../../../type/index'

export type ErrorsCode = {
  code: string
  message: string
}

export type DetailListAuditMaintenance = {
  id: number
  name: string
}

export type AuditMaintenanceList = {
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
      informationData: [
        {
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
            attributeValue: [
              {
                id: number
                name: string
                code: string
              }
            ]
            isParameter: true
            minimum: number
            maximum: number
            uom: {
              id: number
              code: string
              name: string
            }
            lineId: number
          }[]
        }
      ]
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
    startHour: string
    endHour: string
  }
  progress: string
  testStatus: string
}

export type RequestParams = {
  ListAuditMaintenance: {
    search?: string
    testStatus: string | null
    page: number
    size: number
  }
}

export type ResponseBody = {
  GET: {
    ListTitleAuditMaintenances: BaseResponse<DetailListAuditMaintenance[]>
    AuditMaintenanceApprove: BaseResponse<{ id: number }>
    AuditMaintenanceList: PageResponse<AuditMaintenanceList[]>
  }
}
