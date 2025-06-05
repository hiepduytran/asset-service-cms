import { authResourceApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getCurrencyRate = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authResourceApi({
    method: 'get',
    url: '/api/v1/currency/history',
    params,
  })

  return data
}

export const useQueryGetCurrencyRate = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/currency/history', params],
    () => getCurrencyRate(params),
    { ...defaultOption, ...options }
  )
}
