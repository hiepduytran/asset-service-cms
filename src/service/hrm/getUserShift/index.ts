import { authHrmApi } from '@/config/auth'
import { RequestBody, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getUserShiftList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authHrmApi({
    method: 'get',
    url: '/api/v1/staff-working-shift/list',
    params,
  })
  return data
}

export const useQueryUserShiftList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/staff-working-shift/list', params],
    () => getUserShiftList(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
