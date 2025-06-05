import { BaseResponse } from '@/service/type'
import { ReasonSave } from '../type'

export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<ReasonSave>
}
