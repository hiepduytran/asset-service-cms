import { PageResponse } from '@/service/type'

export type RepairUnitList = {
  id: number
  code: string
  name: string
  phoneNumber: string
  product: number
}

export type Response = {
  GET: PageResponse<RepairUnitList[]>
}

export type RequestBody = {
  GET: {
    search?: string
    page: number
    size: number
  }
}
