import { authAssetApi } from '@/config/auth'
import { RequestParams, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getStandardApproveDetail = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/standard-maintenance',
    params,
  })
  return data
}

export const useQueryGetStandardApproveDetail = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/standard-maintenance', params],
    () => getStandardApproveDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const changeStatusApprove = async (params: any): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'put',
    url: '/api/v1/standard-maintenance/approve',
    data: params,
  })
  return data
}
