import { authAssetApi } from '@/config/auth'
import { RequestBody, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getAttributesList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset/category-value',
    params,
  })
  return data
}

export const useQueryAttributesList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/asset/category-value', params],
    () => getAttributesList(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
