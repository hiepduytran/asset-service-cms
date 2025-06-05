import { authAssetApi } from '@/config/auth'
import { RequestBody } from './type'

export const postAssetAllocation = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'post',
    url: '/api/v1/asset-allocation',
    data: requestBody,
  })
}

export const putAssetAllocation = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'put',
    url: '/api/v1/asset-allocation',
    data: requestBody,
  })
}
