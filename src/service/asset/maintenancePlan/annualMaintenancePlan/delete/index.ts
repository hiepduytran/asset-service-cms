import { authAssetApi } from '@/config/auth'
import { RequestBody } from './type'

export const deleteAnnualMaintenancePlan = async (
  params: RequestBody['DELETE']
): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'delete',
    url: `/api/v1/plan-maintenance/year`,
    params,
  })
  return data
}
