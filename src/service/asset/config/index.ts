import { authAssetApi } from '@/config/auth'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'
import { RequestBody, Response } from './type'

export const getConfig = async (): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/config',
  })
  return data
}

export const useQueryGetConfig = (options?: any) => {
  return useQuery(['/api/v1/config'], () => getConfig(), {
    ...defaultOption,
    ...options,
  })
}

export const postConfig = async (params: RequestBody['POST']): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'post',
    url: '/api/v1/config',
    data: params,
  })
  return data
}

export const putConfig = async (params: RequestBody['POST']): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'put',
    url: '/api/v1/config',
    data: params,
  })
  return data
}
