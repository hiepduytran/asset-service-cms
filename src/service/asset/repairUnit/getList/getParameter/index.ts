import { authAssetApi } from '@/config/auth'
import { RequestBody, Response } from './type'

export const getRepairUnitParameter = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/partner-asset-map/details/list',
    params,
  })
  return data
}
