import { authResourceApi } from '@/config/auth'

export const getListDispenser = async (params: any): Promise<any> => {
  const { data } = await authResourceApi({
    method: 'GET',
    url: '/api/v1/employee/list',
    params,
  })
  return data
}
