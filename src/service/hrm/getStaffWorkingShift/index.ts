import { authHrmApi } from '@/config/auth'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getStaffWorkingShift = async (params: any): Promise<any> => {
  const { data } = await authHrmApi({
    method: 'get',
    url: '/api/v1/staff-working-shift/by-user/real-time',
    params,
  })
  return data
}

export const useQueryStaffWorkingShift = (params: any, options?: any) => {
  return useQuery<any>(
    ['/api/v1/staff-working-shift/by-user/real-time', params],
    () => getStaffWorkingShift(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
