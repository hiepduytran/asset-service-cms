import { authAssetApi } from '@/config/auth'
import { RequestBody, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getReasonList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/reason/list',
    params,
  })
  return data
}

export const useQueryReasonList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/reason/list', params],
    () => getReasonList(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getFeatureList = async (
  params: RequestBody['FeatureList']
): Promise<Response['FeatureList']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/reason/feature',
    params,
  })
  return data
}

export const useQueryFeatureList = (
  params: RequestBody['FeatureList'],
  options?: any
) => {
  return useQuery<Response['FeatureList']>(
    ['/api/v1/reason/feature', params],
    () => getFeatureList(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
