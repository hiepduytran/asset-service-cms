import { authProductApi } from '@/config/auth'

export const getListAttributeCategory = async (params: any): Promise<any> => {
  const { data } = await authProductApi({
    method: 'GET',
    url: '/api/v1/product-attribute-category/create-product/page',
    params,
  })
  return data
}
