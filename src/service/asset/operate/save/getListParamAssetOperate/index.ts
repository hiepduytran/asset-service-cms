import { authAssetApi } from '@/config/auth'
import { RequestBody, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getParamAssetOperate = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/track-asset-parameter/codes',
    params,
  })
  return data
}

export const useQueryParamAsset = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/track-asset-parameter/codes', params],
    () => getParamAssetOperate(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
