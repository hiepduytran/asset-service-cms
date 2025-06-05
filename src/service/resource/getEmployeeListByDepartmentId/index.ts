import { authResourceApi } from '@/config/auth'
import { RequestBody, Response } from './type'

export const getEmployeeListByDepartmentId = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authResourceApi({
    method: 'get',
    url: '/api/v1/employee/list',
    params,
  })
  return data
}
