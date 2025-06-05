import { BaseResponse } from '@/service/type'
import { InitialAllocatedAssetsSave } from '../type'

export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<InitialAllocatedAssetsSave>
}
