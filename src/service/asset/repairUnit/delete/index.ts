import { authAssetApi } from '@/config/auth'

export const deleteRepairUnit = async (params: any): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'delete',
    url: `/api/v1/partner-asset-map`,
    params,
  })
  return data
}
