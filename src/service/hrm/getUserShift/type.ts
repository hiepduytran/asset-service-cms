import { PageResponse } from '@/service/type'

export type UserShiftList = {
  id: number
  name: string
}

export type Response = {
  GET: PageResponse<UserShiftList[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
    shiftId: number
  }
}
