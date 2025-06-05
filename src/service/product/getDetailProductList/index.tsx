import { authProductApi } from '@/config/auth'
import { RequestParams, Response } from './type'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'

export const getDetailProduct = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await authProductApi({
    method: 'get',
    url: `/api/v2/product/product-template-by-product-id`,
    params,
  })

  return data
}

export const useQueryUsageStatusDetail = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    ['/api/v2/product/product-template-by-product-id', params],
    () => getDetailProduct(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
