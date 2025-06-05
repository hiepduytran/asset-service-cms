import { authAssetApi } from '@/config/auth'
import { RequestBody, Response } from './type'

export const getAllStandardMethod = async (
  params?: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/standard-method/list',
    params,
  })
  return data
}
