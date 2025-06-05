import { authAssetApi } from '@/config/auth'
import { RequestParams, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getAssetPeriodDetail = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset-period',
    params,
  })
  return data
}

export const useQueryGetAssetPeriodDetail = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/asset-period', params],
    () => getAssetPeriodDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
