import { authAssetApi } from '@/config/auth'
import { RequestParams, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getAssetDetail = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset',
    params,
  })
  return data
}

export const useQueryAssetDetail = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(['/api/v1/asset', params], () => getAssetDetail(params), {
    ...defaultOption,
    ...options,
  })
}
