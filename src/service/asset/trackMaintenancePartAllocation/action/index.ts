import { authAssetApi } from '@/config/auth'
import { ResponseBody } from './type'

export const postRequestMaintenancePart = async (params: {
  planMaintenanceId: number
}): Promise<ResponseBody['POST']['RequestMaintenancePart']> => {
  const { data } = await authAssetApi({
    method: 'post',
    url: '/api/v1/plan-maintenance/request/maintenance',
    params,
  })
  return data
}
