import { authResourceApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'

export const getOrgOfBank = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await authResourceApi({
    method: 'get',
    url: '/api/v1/bank/list/bank-orges',
    params,
  })
  return data
}

export const useQueryGetOrgOfBank = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/bank/list/bank-orges', params],
    () => getOrgOfBank(params),
    { ...defaultOption, ...options }
  )
}
