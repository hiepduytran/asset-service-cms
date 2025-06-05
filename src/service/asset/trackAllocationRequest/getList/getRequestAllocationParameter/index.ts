import { authAssetApi } from '@/config/auth'
import { RequestBody } from './type'
import { Response } from './type'

export const getRequestAllocationFollow = async (params: {
  id: number
}): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/allocation-request/details/follow/list',
    params,
  })
  return data
}
