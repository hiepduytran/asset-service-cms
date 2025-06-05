import { authManuApi } from '@/config/auth'

export const getListProductAssignment = async (params: any): Promise<any> => {
  const { data } = await authManuApi({
    method: 'GET',
    url: '/api/v1/production-assignment/by-department',
    params,
  })
  return data
}
