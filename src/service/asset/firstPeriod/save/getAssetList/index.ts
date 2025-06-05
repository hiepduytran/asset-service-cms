import { authAssetApi } from '@/config/auth'

export const getAssetList = async (params: any): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset/list',
    params,
  })
  return data
}
