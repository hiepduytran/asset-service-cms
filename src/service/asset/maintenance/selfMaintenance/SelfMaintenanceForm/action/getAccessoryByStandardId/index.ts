import { authAssetApi } from '@/config/auth'
import { RequestBody, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getAccessoryByStandardId = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/standard-maintenance/spare-part/list',
    params,
  })
  return data
}

export const useQueryGetAccessoryByStandardId = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/standard-maintenance/spare-part/list', params],
    () => getAccessoryByStandardId(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
