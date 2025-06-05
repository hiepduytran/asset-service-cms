import { authAssetApi } from '@/config/auth'
import { RequestBody, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const postPolicyRole = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'post',
    url: '/api/v1/policy-role',
    data: requestBody,
  })
}

export const putPolicyRole = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'put',
    url: '/api/v1/policy-role',
    data: requestBody,
  })
}

export const getPolicyRole = async (params: {}): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/policy-role',
    params,
  })
  return data
}

export const useQueryPolicyRole = (params: {}, options?: any) => {
  return useQuery(
    ['/api/v1/policy-role', params],
    () => getPolicyRole(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
