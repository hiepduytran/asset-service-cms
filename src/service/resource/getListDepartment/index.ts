import { authResourceApi } from '@/config/auth'

export const getListDepartment = async (params: any): Promise<any> => {
  const { data } = await authResourceApi({
    method: 'GET',
    url: '/api/v1/department/list',
    params,
  })
  return data
}
