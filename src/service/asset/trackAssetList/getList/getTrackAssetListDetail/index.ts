import { authAssetApi } from '@/config/auth'
import { RequestBody, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getTrackAssetListDetail = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset/follow/asset-by-allocation',
    params,
  })
  return data
}

export const useQueryTrackAssetListDetail = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/asset/follow/asset-by-allocation', params],
    () => getTrackAssetListDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
