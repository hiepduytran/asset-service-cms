import { authAssetApi } from '@/config/auth'
import { RequestBody } from './type'

export const deleteAssetAllocation = async (
  params: RequestBody['DELETE']
): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'delete',
    url: `/api/v1/asset-allocation`,
    params,
  })
  return data
}
