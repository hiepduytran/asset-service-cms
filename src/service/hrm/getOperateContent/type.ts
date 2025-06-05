import { BaseResponse } from '@/service/type'

export type OperateContent = {
  content: string
  color: string
  actionRegulation: string
}

export type Response = {
  GET: BaseResponse<OperateContent>
}

export type RequestParams = {
  GET: {
    temperate: number
    lineId: number
  }
}
