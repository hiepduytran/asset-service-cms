import { BaseResponse } from '@/service/type'

type RequestAllocationDetail = {
  id: number | null,
  code: string | null,
  department: {
    id: number,
    name: string,
    code: string
  } | null,
  requestDate: Date | null,
  desiredAllocationDate: Date | null,
  note: string | null,
  statusOfRequest: string | null,
  allocationLine:
  {
    asset: {
      id: number,
      name: string,
      code: string
    },
    quantity: number,
    inventoryQuantity: number,
    staff: {
      id: number,
      name: string,
      code: string
    }
  }[] | []
}

export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<RequestAllocationDetail>
}
