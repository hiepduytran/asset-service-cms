import { PageResponse } from '@/service/type'

export interface AccessoryDemand {
  asset: Asset
  quantity: number
  nextMaintenanceDate: string
}

export interface Asset {
  id: number
  name: string
  code: string
}

export type Response = {
  GET: PageResponse<AccessoryDemand[]>
}

export type RequestBody = {
  GET: {
    maintenanceProductId: number
    maintenanceAssetIds: number[]
  }
}
