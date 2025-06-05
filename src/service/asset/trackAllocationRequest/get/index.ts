import { authAssetApi } from '@/config/auth'
import { RequestParams, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getTrackAllocationRequestDetail = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/allocation-request',
    params,
  })
  return data
}

export const useQueryGetTrackAllocationRequestDetail = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/allocation-request', params],
    () => getTrackAllocationRequestDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const changeStatusApprove = async (params: any): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'post',
    url: '/api/v1/allocation-request/approve',
    params,
  })
  return data
}
