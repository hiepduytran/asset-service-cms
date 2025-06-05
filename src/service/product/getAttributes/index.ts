import { authProductApi } from '@/config/auth'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'
import { defaultOption } from '@/config/reactQuery'

export const getProductAttributes = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await authProductApi({
    method: 'get',
    url: `/api/v1/product-attribute-category/attribute-category-and-attribute`,
    params: params,
  })

  return data
}

export const useQueryGetProductAttributeCategory = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    [
      `/api/v1/product-attribute-category/attribute-category-and-attribute`,
      params,
    ],
    () => getProductAttributes({ ...params }),
    { ...defaultOption, ...options }
  )
}
