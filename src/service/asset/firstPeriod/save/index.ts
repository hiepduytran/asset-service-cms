import { authAssetApi } from '@/config/auth'
import { RequestBody } from './type'

export const postFirstPeriodSave = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'post',
    url: '/api/v1/asset-first-period',
    data: requestBody,
  })
}
