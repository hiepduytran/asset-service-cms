import { authAssetApi } from '@/config/auth'
import { RequestBody, Response } from './type'

export const getParameter = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/initial-allocation/parameter',
    params,
  })
  return data
}
