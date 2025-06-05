import { authAssetApi } from '@/config/auth'

export const getFrequencyByAssetId = async (params: any): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/asset-period/frequency',
    params,
  })
  return data
}
