import { authResourceApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'

export const getEmployeeByUserId = async (params: any): Promise<any> => {
  const { data } = await authResourceApi({
    method: 'GET',
    url: '/api/v1/employee/info-by-user',
    params,
  })
  return data
}

export const useQueryEmployeeByUserId = (params: any, options?: any) => {
  return useQuery<any>(
    ['/api/v1/employee/info-by-user', params],
    () => getEmployeeByUserId(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
