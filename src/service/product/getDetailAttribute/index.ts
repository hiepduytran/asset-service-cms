import { authProductApi } from '@/config/auth'

export const getDetailAttribute = async (params: any): Promise<any> => {
  const { data } = await authProductApi({
    method: 'GET',
    url: '/api/v1/product-attribute-category/get-attribute',
    params,
  })
  return data
}
