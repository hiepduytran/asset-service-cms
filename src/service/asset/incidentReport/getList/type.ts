import { PageResponse } from '@/service/type'

export type IncidentReportList = {
  id: number
  code: string
  name: string
  product: {
    id: number
    name: string
    code: string
  }
  severityManagement: {
    id: number
    name: string
    code: string
  }
  asset: {
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
          attributes: [
            {
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
            }
          ]
        }
      ]
    }
    imageUrls: [string]
  }
  quantityIncident: number
  recorder: {
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
  recordingTime: string
  incidentRecodingIds: [number]
  status: string
  approve: string
  note: string
  incidentRecording: string
  statusAsset: string
  statusPlan: string
  statusHandle: string
  statusAfterHandle: string
}

export type Response = {
  GET: PageResponse<IncidentReportList[]>
}

export type RequestBody = {
  GET: {
    search?: string
    severityManagementId?: number
    severityManagement: {
      id: number | null
      code: string
      name: string
    }
    departmentId?: number
    department: {
      id: number | null
      code: string
      name: string
    }
    page?: number
    size?: number
  }
}
