import { authProductApi } from '@/config/auth'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { defaultOption } from '@/config/reactQuery'

export const getProductAttributeCategory = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authProductApi({
    method: 'get',
    url: `/api/v2/product-attribute-category/tiny-list`,
    params: params,
  })

  return data
}

export const useQueryGetProductAttributeCategory = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    [`/api/v2/product-attribute-category/tiny-list`, params],
    () => getProductAttributeCategory({ ...params }),
    { ...defaultOption, ...options }
  )
}
