import { authManuApi } from '@/config/auth'

export const getListStage = async (params: any): Promise<any> => {
  const { data } = await authManuApi({
    method: 'GET',
    url: '/api/v1/stage-management/list',
    params,
  })
  return data
}
