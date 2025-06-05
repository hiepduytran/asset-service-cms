import { RequestBody, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'
import { authResourceApi } from '@/config/auth'

export const getListPartner = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authResourceApi({
    method: 'GET',
    url: '/api/v1/partners/org-list-tiny',
    params,
  })
  return data
}

export const useQueryListVendor = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/partners/org-list-tiny', params],
    () => getListPartner(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
