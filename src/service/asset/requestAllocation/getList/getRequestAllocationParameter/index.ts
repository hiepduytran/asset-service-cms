import { authAssetApi } from '@/config/auth'
import { RequestBody } from './type'
import { Response } from './type'

export const getRequestAllocationParameter = async (
  params: RequestBody['GET']['RequestAllocationParameter']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/allocation-request/details/list',
    params,
  })
  return data
}

export const getRequestAllocationDetails = async (
  params: RequestBody['GET']['RequestAllocationDetails']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/allocation-request/details/follow/list',
    params,
  })
  return data
}
