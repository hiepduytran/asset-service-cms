import { authAssetApi } from '@/config/auth'
import { RequestBody } from './type'
import { Response } from './type'

export const getAssetPeriodParameter = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset-period/details/list',
    params,
  })
  return data
}
