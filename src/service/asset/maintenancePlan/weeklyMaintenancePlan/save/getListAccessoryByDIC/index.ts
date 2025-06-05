import { authAssetApi } from '@/config/auth'

export const getListAccessoryByDIC = async (params: any): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/config/accessory/accessory',
    params,
  })
  return data
}
