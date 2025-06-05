import { PageResponse } from '@/service/type'

export type ApproveAllocationRequest = {
  id: number
  code: string
  department: {
    id: 1
    name: string
    code: string
  }
  asset: {
    id: number
    name: string
    code: string
  }
  requestDate: Date
  desiredAllocationDate: Date
  totalQuantity: number
  statusOfRequest: string
}

export type Response = {
  GET: PageResponse<ApproveAllocationRequest[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
    requestDate?: string | null
    desiredAllocationDate?: string | null
    allocationChooseType?: string | null
    status?: string | null
  }
}
