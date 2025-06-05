import { authProductApi } from '@/config/auth'
import { RequestBody, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getListProduct = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authProductApi({
    method: 'GET',
    url: '/api/v1/internal/product-template/list',
    params,
  })
  return data
}

export const useQueryListProduct = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/internal/product-template/list', params],
    () => getListProduct(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
