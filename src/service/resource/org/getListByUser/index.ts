import { authResourceApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getOrgByUserList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authResourceApi({
    method: 'get',
    url: '/api/v1/user-org-map/list',
    params,
  })
  return data
}

export const useQueryGetOrgByUserList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/user-org-map/list', params],
    () => getOrgByUserList(params),
    { ...defaultOption, ...options }
  )
}
