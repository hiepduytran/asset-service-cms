import { authAssetApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams, ResponseBody } from './type'

export const assetHistoryList = async (
  params: RequestParams['GET']
): Promise<ResponseBody['AssetHistoryList']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset-history/list',
    params,
  })
  return data
}

export const useQueryAssetHistoryList = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery<ResponseBody['AssetHistoryList']>(
    ['/api/v1/asset-history/list', params],
    () => assetHistoryList(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const assetHistoryListDetail = async (params: {
  assetId: number
}): Promise<ResponseBody['AssetHistoryListDetail']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset-history/details/list',
    params,
  })
  return data
}

export const assetHistoryListTime = async (
  params: RequestParams['GET']
): Promise<ResponseBody['AssetHistoryListTime']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset-history/time/list',
    params,
  })
  return data
}

export const useQueryAssetHistoryListTime = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery<ResponseBody['AssetHistoryListTime']>(
    ['/api/v1/asset-history/time/list', params],
    () => assetHistoryListTime(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
