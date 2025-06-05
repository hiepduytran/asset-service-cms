import { PageResponse } from '@/service/type'

export type RequestAllocation = {
  id: number
  code: string
  requestDate: string
  updateDate: string
  note: string
  allocationChooseType: string
  organization: string
  department: string
  employee: string
  quantity: number
  status: string
}

export type Response = {
  GET: PageResponse<RequestAllocation[]>
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


    startDate?: string | null
    endDate?: string | null

  }
}
