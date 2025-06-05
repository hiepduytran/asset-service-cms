import { authAssetApi } from '@/config/auth'
import { RequestBody } from './type'

export const postGroupStandard = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authAssetApi({
    method: 'POST',
    url: '/api/v1/config/standard',
    data: requestBody,
  })
}

export const putGroupStandard = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authAssetApi({
    method: 'PUT',
    url: '/api/v1/config/standard',
    data: requestBody,
  })
}
