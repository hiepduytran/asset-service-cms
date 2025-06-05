import { authResourceApi } from '@/config/auth'

export const getListStaff = async (params: any): Promise<any> => {
  const { data } = await authResourceApi({
    method: 'GET',
    url: '/api/v1/employee/account/list',
    params,
  })
  return data
}
