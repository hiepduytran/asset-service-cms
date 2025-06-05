import { authAssetApi } from '@/config/auth'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'
import { RequestParams, Response } from './type'

export const getInitialAllocatedAssets = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/initial-allocation',
    params,
  })
  return data
}

export const useQueryInitialAllocatedAssets = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/initial-allocation', params],
    () => getInitialAllocatedAssets(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
