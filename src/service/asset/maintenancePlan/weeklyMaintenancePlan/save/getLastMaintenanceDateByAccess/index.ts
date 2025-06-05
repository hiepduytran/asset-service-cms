import { authAssetApi } from '@/config/auth'

export const getLastMaintenanceDateByAccess = async (
  params: any
): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/asset-first-period/last-maintenance-date',
    params,
  })
  return data
}
