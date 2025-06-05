import { authUaaApi } from '@/config/auth'

export const getListOfRoles = async (params: any): Promise<any> => {
  const { data } = await authUaaApi({
    method: 'GET',
    url: '/api/v1/role/list',
    params,
  })
  return data
}
