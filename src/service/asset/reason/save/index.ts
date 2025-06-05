import { authAssetApi } from '@/config/auth'
import { RequestBody } from './type'

export const postReason = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'post',
    url: '/api/v1/reason',
    data: requestBody,
  })
}
export const putReason = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'put',
    url: '/api/v1/reason',
    data: requestBody,
  })
}
