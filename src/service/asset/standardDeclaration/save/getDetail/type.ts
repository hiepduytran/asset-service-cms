import { BaseResponse } from '@/service/type'

type GroupStandardDetail = {
  id?: number | null
  code: string
  name: string
  standardCreatedAt: Date
  status: boolean
}

export type RequestParams = {
  GET: { groupStandardId: number }
}

export type Response = {
  GET: BaseResponse<GroupStandardDetail>
}
