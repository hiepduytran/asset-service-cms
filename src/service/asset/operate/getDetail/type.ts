import { BaseResponse } from '@/service/type'
import { OperateSave } from '../save/type'

export type OperateDetail = OperateSave

export type Response = {
  GET: BaseResponse<OperateDetail>
}

export type RequestParams = {
  GET: { id: number }
}
