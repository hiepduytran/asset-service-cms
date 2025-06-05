import { PageResponse } from '@/service/type'

export type DetailListAutoMaintenance = {
  assetId: number
  product: {
    id: number
    name: string
  }
  department: {
    id: number
    name: string
  }
}

export type RequestParam = {
  LIST: {
    search?: string
    departmentIds?: number[]
    department?: {
      id: number
      code: string
      name: string
    }
    status?: string | null
    page: number
    size: number
  }
}

export type ListAutoMaintenanceHistory = {
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
      }[]
    }
    imageUrls: string[]
  }
  department: {
    id: number
    name: string
    code: string
  }
  maintenanceStartTime: string
  maintenanceDateNearly: string
  status: string
}

export type ResponseBody = {
  LIST: {
    ListAutoMaintenanceHistory: PageResponse<ListAutoMaintenanceHistory[]>
  }
}
