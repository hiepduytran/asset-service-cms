import { authAssetApi } from '@/config/auth'
import { RequestBody } from './type'

export const putApproveMaintenancePlan = async (
  requestBody: RequestBody['PUT']
): Promise<any> => {
  return await authAssetApi({
    method: 'put',
    url: '/api/v1/plan-maintenance/approve',
    data: requestBody,
  })
}
