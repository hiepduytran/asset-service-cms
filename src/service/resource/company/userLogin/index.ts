import { authResourceApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { Response } from './type'

export const getCompanyUserLogin = async (): Promise<Response['GET']> => {
  const { data } = await authResourceApi({
    method: 'get',
    url: '/api/v1/companies/info',
  })
  return data
}

export const useQueryGetCompanyUserLogin = (options?: any) => {
  return useQuery(['/api/v1/companies/info'], () => getCompanyUserLogin(), {
    ...defaultOption,
    ...options,
  })
}
