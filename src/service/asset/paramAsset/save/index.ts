import { authAssetApi } from '@/config/auth'
import { RequestBody } from './type'

export const postParamAssetSave = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'post',
    url: '/api/v1/track-asset-parameter',
    data: requestBody,
  })
}

export const putParamAssetSave = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'put',
    url: '/api/v1/track-asset-parameter',
    data: requestBody,
  })
}
