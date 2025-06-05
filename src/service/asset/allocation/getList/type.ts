import { PageResponse } from '@/service/type'

export type AssetAllocation = {
  id: number
  code: string
  requestDate: string
  updateDate: string
  allocationChooseType: string
  organization: string
  department: string
  employee: string
  quantity: number
  quantityRecall: number
  allocationStatus: string
}

export type Response = {
  GET: PageResponse<AssetAllocation[]>
}

export type RequestBody = {
  GET: {
    search?: string
    page?: number
    size?: number
    statusOfRequest?: string | null
  }
}
