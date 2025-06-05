import { authAssetApi } from '@/config/auth'
import { RequestBody } from './type'

export const postMaintenanceAccessorySave = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'post',
    url: '/api/v1/config/maintenance',
    data: requestBody,
  })
}

export const putMaintenanceAccessorySave = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'put',
    url: '/api/v1/config/maintenance',
    data: requestBody,
  })
}
