import { authResourceApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getCompanyList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authResourceApi({
    method: 'get',
    url: '/api/v1/companies/list',
    params,
  })
  return data
}

export const useQueryGetCompanyList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/companies/list', params],
    () => getCompanyList(params),
    { ...defaultOption, ...options }
  )
}

export const getSecondaryCurrencyCompanyList = async (
  params: RequestBody['GET_SECONDARY_CURRENCY']
): Promise<Response['GET_SECONDARY_CURRENCY']> => {
  const { data } = await authResourceApi({
    method: 'get',
    url: '/api/v1/companies/page-secondary-currency',
    params,
  })
  return data
}

export const useQueryGetSecondaryCurrencyCompanyList = (
  params: RequestBody['GET_SECONDARY_CURRENCY'],
  options?: any
) => {
  return useQuery<Response['GET_SECONDARY_CURRENCY']>(
    ['/api/v1/companies/page-secondary-currency', params],
    () => getSecondaryCurrencyCompanyList(params),
    { ...defaultOption, ...options }
  )
}
