import { authAssetApi } from '@/config/auth'
import { RequestParams, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getUsageStatusDetail = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/usage',
    params,
  })
  return data
}

export const useQueryUsageStatusDetail = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/usage', params],
    () => getUsageStatusDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
