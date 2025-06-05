import { authAssetApi } from '@/config/auth'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'
import { RequestBody, RequestParams, Response } from './type'

export const getAssetLocation = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset/location',
    params,
  })
  return data
}

export const useQueryAssetLocation = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/asset/location', params],
    () => getAssetLocation(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const postAssetLocation = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'post',
    url: '/api/v1/asset/location',
    data: requestBody,
  })
}

export const putAssetLocation = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'put',
    url: '/api/v1/asset/location',
    data: requestBody,
  })
}
