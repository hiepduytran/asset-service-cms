import { PageResponse } from '@/service/type'

export type MaintenanceAccessory = {
  id: number,
  sku: string,
  name: string,
  itemQuantity: number
}

export type Response = {
  GET: PageResponse<MaintenanceAccessory[]>
}

export type RequestBody = {
  GET: {
    search: string | null
    page: number
    size: number
  }
}
