import { authAssetApi } from '@/config/auth'
import { RequestBody } from './type'

export const postOperate = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authAssetApi({
    method: 'post',
    url: '/api/v1/operate',
    data: requestBody,
  })
}

export const putOperate = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authAssetApi({
    method: 'put',
    url: '/api/v1/operate',
    data: requestBody,
  })
}
