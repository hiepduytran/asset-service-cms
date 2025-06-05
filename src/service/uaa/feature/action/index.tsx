import { authUaaApi } from '@/config/auth'
import { BaseResponse } from '@/service/type'
import { END_POINT_FEATURE } from '../get'
import { RequestBodySaveFeature } from './type'

export const actionFeature = async (arg: {
  method: 'post' | 'put' | 'delete'
  params: {
    featureId?: number
  }
  data?: RequestBodySaveFeature
}): Promise<BaseResponse<{ id: number }>> => {
  const { data } = await authUaaApi({
    method: arg.method,
    url: END_POINT_FEATURE,
    params: arg.params,
    data: arg?.data,
  })

  return data
}
