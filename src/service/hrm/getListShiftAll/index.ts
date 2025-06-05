import { authHrmApi } from '@/config/auth'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getListShiftAll = async (params: any): Promise<any> => {
  const { data } = await authHrmApi({
    method: 'get',
    url: '/api/v1/working-schedule-configs-shift/list',
    params,
  })
  return data
}

export const useQueryListShiftAll = (params: any, options?: any) => {
  return useQuery<any>(
    ['/api/v1/working-schedule-configs-shift/list', params],
    () => getListShiftAll(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
