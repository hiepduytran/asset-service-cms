import { authUaaApi } from '@/config/auth'
import { BaseResponse } from '@/service/type'
import { RequestBodySaveSystem } from './type'

export const END_POINT_SYSTEM = '/api/v1/system'

export const actionSystem = async (arg: {
  method: 'post' | 'put' | 'delete'
  params: {
    systemId?: number
  }
  data?: RequestBodySaveSystem
}): Promise<BaseResponse<{ id: number }>> => {
  const { data } = await authUaaApi({
    method: arg.method,
    url: END_POINT_SYSTEM,
    params: arg.params,
    data: arg?.data,
  })

  return data
}
