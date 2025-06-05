import { authAssetApi } from '@/config/auth'
import { RequestBody } from './type'

export const postAssetAccessory = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'post',
    url: '/api/v1/config/accessory',
    data: requestBody,
  })
}

export const putAssetAccessory = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'put',
    url: '/api/v1/config/accessory',
    data: requestBody,
  })
}
