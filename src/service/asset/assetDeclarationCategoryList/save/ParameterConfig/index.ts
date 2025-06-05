import { authAssetApi } from '@/config/auth'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'
import { RequestBody, RequestParams, Response } from './type'

export const getParameterConfig = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset/parameter-config',
    params,
  })
  return data
}

export const useQueryParameterConfig = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/asset/parameter-config', params],
    () => getParameterConfig(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const postParameterConfig = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'post',
    url: '/api/v1/asset/parameter-config',
    data: requestBody,
  })
}
