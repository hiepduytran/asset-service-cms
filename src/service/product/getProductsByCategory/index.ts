import { authProductApi } from '@/config/auth'

export const getProductsByCategory = async (params: any): Promise<any> => {
  const { data } = await authProductApi({
    method: 'get',
    url: '/api/v1/product-category/products/list',
    params,
  })
  return data
}
