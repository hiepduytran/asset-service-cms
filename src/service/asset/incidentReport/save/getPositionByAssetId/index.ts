import { authAssetApi } from '@/config/auth'

export const getPositionByAssetId = async (params: any): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset/position',
    params,
  })
  return data
}
