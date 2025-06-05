import { authProductApi } from '@/config/auth'

export const getListProductCategory = async (params: any): Promise<any> => {
  const { data } = await authProductApi({
    method: 'GET',
    url: '/api/v1/common/product-template/product-category',
    params,
  })
  return data
}
