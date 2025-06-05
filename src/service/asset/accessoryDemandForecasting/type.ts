import { PageResponse } from '@/service/type'

export interface AccessoryDemandForecasting {
  id: number
  maintenanceProduct: MaintenanceProduct
  type: string
  available: number
  uom: Uom
  requirement: number
  needImport: number
  maintenanceIds: number[]
}

export interface MaintenanceProduct {
  id: number
  name: string
  code: string
}

export interface Uom {
  id: number
  name: string
}

export type Response = {
  GET: PageResponse<AccessoryDemandForecasting[]>
}

export type RequestBody = {
  GET: {
    search: string | null
    page?: number
    size?: number
    startDate: string | null
    endDate: string | null
  }
}
