import { authAssetApi } from '@/config/auth'
import { RequestBody } from './type'

export const postInitialAllocatedAssets = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'post',
    url: '/api/v1/initial-allocation',
    data: requestBody,
  })
}
