import { authUaaApi } from '@/config/auth'

export const getListByUser = async (params: any): Promise<any> => {
  const { data } = await authUaaApi({
    method: 'GET',
    url: '/api/v1/role/multi-tenant/list',
    params,
  })
  return data
}
