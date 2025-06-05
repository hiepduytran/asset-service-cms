import { authAssetApi } from '@/config/auth'
import { RequestBody } from './type'

export const postAssetPeriodSave = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'post',
    url: '/api/v1/asset-period',
    data: requestBody,
  })
}

export const putAssetPeriodSave = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'put',
    url: '/api/v1/asset-period',
    data: requestBody,
  })
}
