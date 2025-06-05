import { authAssetApi } from '@/config/auth'
import { RequestParams, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getRequestAllocationDetail = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/allocation-request',
    params,
  })
  return data
}

export const useQueryGetRequestAllocationDetail = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/allocation-request', params],
    () => getRequestAllocationDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
