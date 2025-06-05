import { ParamAssetSave } from '../save/type'
import { BaseResponse } from '@/service/type'

export type ParamAssetDetail = ParamAssetSave

export type Response = {
  GET: BaseResponse<ParamAssetDetail>
}

export type RequestParams = {
  GET: { id: number }
}
