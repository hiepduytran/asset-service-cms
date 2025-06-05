import { authResourceApi } from '@/config/auth'

export const getListPartnerTag = async (params: any): Promise<any> => {
  const { data } = await authResourceApi({
    method: 'get',
    url: '/api/v1/vendor/partner-tag/list',
    params,
  })
  return data
}
