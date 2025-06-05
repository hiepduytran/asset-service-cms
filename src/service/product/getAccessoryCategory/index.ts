import { authProductApi } from '@/config/auth'

export const getAccessoryCategory = async (params: any): Promise<any> => {
  const { data } = await authProductApi({
    method: 'get',
    url: '/api/v1/product-category/internal-accessory',
    params,
  })
  return data
}
