import { authAssetApi } from '@/config/auth'
import { RequestBody } from './type'

export const postAsset = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authAssetApi({
    method: 'post',
    url: '/api/v1/asset',
    data: requestBody,
  })
}

export const putAsset = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authAssetApi({
    method: 'put',
    url: '/api/v1/asset',
    data: requestBody,
  })
}
