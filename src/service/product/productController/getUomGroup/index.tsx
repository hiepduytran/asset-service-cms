import { authProductApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getUomProductList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authProductApi({
    method: 'get',
    url: '/api/v1/product-with-uom/detail/has-uom-group',
    params,
  })
  return data
}

export const useQueryGetUomProductList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/product-with-uom/detail/has-uom-group', params],
    () => getUomProductList(params),
    { ...defaultOption, ...options }
  )
}
