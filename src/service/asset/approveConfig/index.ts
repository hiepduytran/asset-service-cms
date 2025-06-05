import { authAssetApi } from '@/config/auth'
import { RequestBody, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const postApproveConfig = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'post',
    url: '/api/v1/approve-config',
    data: requestBody,
  })
}

export const putApproveConfig = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'put',
    url: '/api/v1/approve-config',
    data: requestBody,
  })
}

export const getApproveConfig = async (params: {}): Promise<
  Response['GET']
> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/approve-config',
    params,
  })
  return data
}

export const useQueryApproveConfig = (params: {}, options?: any) => {
  return useQuery(
    ['/api/v1/approve-config', params],
    () => getApproveConfig(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
