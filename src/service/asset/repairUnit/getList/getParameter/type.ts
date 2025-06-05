import { BaseResponse } from '@/service/type'

export type RepairUnitParameter = {
  id: number
  name: string
  code: string
}

export type Response = {
  GET: BaseResponse<RepairUnitParameter[]>
}

export type RequestBody = {
  GET: {
    id: number
  }
}
