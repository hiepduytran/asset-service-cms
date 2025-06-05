import { authAssetApi } from '@/config/auth'
import { RequestParams, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getAssetParameterDetail = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/track-asset-parameter',
    params,
  })
  return data
}

export const useQueryAssetParameterDetail = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/track-asset-parameter', params],
    () => getAssetParameterDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
