import { authAssetApi } from '@/config/auth'
import { RequestBody, Response } from './type'

export const getAssetAccessoryParameter = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/config/accessory/accessory/list',
    params,
  })
  return data
}
