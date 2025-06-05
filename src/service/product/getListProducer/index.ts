import { authProductApi } from '@/config/auth'

export const getListProducer = async (params: any): Promise<any> => {
  const { data } = await authProductApi({
    method: 'get',
    url: '/api/v1/product/vendor/page',
    params,
  })
  return data
}
