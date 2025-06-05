import { authAssetApi } from '@/config/auth'
import { RequestBody, Response } from './type'

// Track Asset List
export const getTrackAssetListParameter = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset/details/list',
    params,
  })
  return data
}

// Allocated Asset List
export const getFollowProductId = async (params: any): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset/follow/product-id',
    params,
  })
  return data
}
