import { PageResponse } from '@/service/type'

export type InitialAllocatedAssetsList = {
  id: number
  code: string
  updateDate: string
  requestDate: string
  note: string
  allocationChooseType: string
  quantity: number
  department: {
    id: string
    name: string
    code: string
  }
  employee: {
    id: number
    code: string
    lastName: string
    firstName: string
    name: string
  }
  organization: {
    id: string
    name: string
    code: string
  }
}

export type Response = {
  GET: PageResponse<InitialAllocatedAssetsList[]>
}

export type RequestBody = {
  GET: {
    search?: string
    requestDate?: string
    desiredAllocationDate?: string
    chooseType?: string | null
    page?: number
    size?: number
  }
}
