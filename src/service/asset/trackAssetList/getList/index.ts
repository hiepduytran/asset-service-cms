import { authAssetApi } from '@/config/auth'
import { RequestBody, Response, ResponseIdentifierCode } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

// ASSET CODE
export const getTrackAssetList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset/follow/list',
    params,
  })
  return data
}

export const useQueryTrackAssetList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/asset/follow/list', params],
    () => getTrackAssetList(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

// Allocated Asset List
export const getFollowGetAll = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset/follow/get-all',
    params,
  })
  return data
}

export const useQueryFollowGetAll = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/asset/follow/get-all', params],
    () => getFollowGetAll(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

// IDENTIFIER CODE
export const getTrackAssetListIdentifierCode = async (
  params: RequestBody['GET']
): Promise<ResponseIdentifierCode['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset/follow/asset-list-dic',
    params,
  })
  return data
}

export const useQueryTrackAssetListIdentifierCode = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<ResponseIdentifierCode['GET']>(
    ['/api/v1/asset/follow/asset-list-dic', params],
    () => getTrackAssetListIdentifierCode(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
