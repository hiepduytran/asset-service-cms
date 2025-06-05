import { authProductApi } from '@/config/auth'

export const getAssetList = async (params: any): Promise<any> => {
  const { data } = await authProductApi({
    method: 'get',
    url: '/api/v2/product/list2',
    params,
  })
  return data
}
