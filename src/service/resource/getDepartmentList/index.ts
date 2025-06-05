import { authResourceApi } from '@/config/auth'

export const getDepartmentList = async (params: any): Promise<any> => {
  const { data } = await authResourceApi({
    method: 'get',
    url: '/api/v1/department/list',
    params,
  })
  return data
}
