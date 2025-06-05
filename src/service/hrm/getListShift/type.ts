import { BaseResponse } from '@/service/type'

export type ShiftList = {
  id: number
  name: string
}

export type Response = {
  GET: BaseResponse<ShiftList>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
  }
}
