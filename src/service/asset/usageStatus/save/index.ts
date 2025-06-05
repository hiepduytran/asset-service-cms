import { authAssetApi } from '@/config/auth'
import { RequestBody } from './type'

export const postUsageStatus = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authAssetApi({
    method: 'post',
    url: '/api/v1/usage',
    data: requestBody,
  })
}

export const putUsageStatus = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authAssetApi({
    method: 'put',
    url: '/api/v1/usage',
    data: requestBody,
  })
}
