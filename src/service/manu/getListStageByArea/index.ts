import { authManuApi } from '@/config/auth'

export const getListStageByArea = async (params: any): Promise<any> => {
  const { data } = await authManuApi({
    method: 'GET',
    url: '/api/v1/stage-management/by-area',
    params,
  })
  return data
}
