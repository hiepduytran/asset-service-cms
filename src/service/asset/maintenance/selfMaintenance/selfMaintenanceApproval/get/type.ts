import { authAssetApi } from '@/config/auth'

export const changeStatusMaintenanceCardApprove = async (
  params: any
): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'put',
    url: '/api/v1/maintenance-card/state',
    params,
  })
  return data
}
