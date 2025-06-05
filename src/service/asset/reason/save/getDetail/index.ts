import { authAssetApi } from '@/config/auth'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'
import { RequestParams, Response } from './type'

export const getReasonDetail = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/reason',
    params,
  })
  return data
}

export const useQueryReasonDetail = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(['/api/v1/reason', params], () => getReasonDetail(params), {
    ...defaultOption,
    ...options,
  })
}
