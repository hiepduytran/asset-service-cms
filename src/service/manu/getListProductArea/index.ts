import { authManuApi } from '@/config/auth'

export const getListProductArea = async (params: any): Promise<any> => {
  const { data } = await authManuApi({
    method: 'GET',
    url: '/api/v1/product-area-management/by-workshop',
    params,
  })
  return data
}
