import { authManuApi } from '@/config/auth'

export const getListProductionRequest = async (params: any): Promise<any> => {
  const { data } = await authManuApi({
    method: 'GET',
    url: '/api/v1/production-request/list',
    params,
  })
  return data
}
