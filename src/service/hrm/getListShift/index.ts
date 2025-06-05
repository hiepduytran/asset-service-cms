import { authHrmApi } from '@/config/auth'
import { RequestBody, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getShiftList = async (params: any): Promise<any> => {
  const { data } = await authHrmApi({
    method: 'get',
    url: '/api/v1/staff-working-shift/by-user',
    params,
  })
  return data
}

export const useQueryShiftList = (params: any, options?: any) => {
  return useQuery<Response['GET']>(
    ['/api/v1/staff-working-shift/by-user', params],
    () => getShiftList(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
