import { authAssetApi } from '@/config/auth'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'
import { RequestParams, Response } from './type'

export const getAssetAllocationDetail = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset-allocation',
    params,
  })
  return data
}

export const useQueryAssetAllocationDetail = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/asset-allocation', params],
    () => getAssetAllocationDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
