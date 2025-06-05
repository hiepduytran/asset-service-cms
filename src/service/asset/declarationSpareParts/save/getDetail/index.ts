import { authAssetApi } from '@/config/auth'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'
import { RequestParams, Response } from './type'

export const getAssetAccessoryDetail = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/config/accessory',
    params,
  })
  return data
}

export const useQueryAssetAccessoryDetail = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/config/accessory', params],
    () => getAssetAccessoryDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
