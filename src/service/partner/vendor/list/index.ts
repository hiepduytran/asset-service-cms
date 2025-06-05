import { authResourceApi } from '@/config/auth'

export const getListVendor = async (params: any): Promise<any> => {
  const { data } = await authResourceApi({
    method: 'get',
    url: '/api/v1/vendor/partners/list',
    params,
  })
  return data
}
