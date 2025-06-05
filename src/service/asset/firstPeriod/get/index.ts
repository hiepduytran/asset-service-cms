import { authAssetApi } from '@/config/auth'
import { RequestParams, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getFirstPeriodDetail = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset-first-period',
    params,
  })
  return data
}

export const useQueryGetFirstPeriodDetail = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/asset-first-period', params],
    () => getFirstPeriodDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
