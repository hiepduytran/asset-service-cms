import { BaseResponse } from '@/service/type'

type UsageStatusDetail = {
  id?: number | null
  code: string
  name: string
  isActive: boolean
}

export type RequestParams = {
  GET: { usageId: number }
}

export type Response = {
  GET: BaseResponse<UsageStatusDetail>
}
