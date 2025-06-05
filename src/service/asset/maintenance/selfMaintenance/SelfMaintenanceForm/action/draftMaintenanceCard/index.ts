import { authAssetApi } from '@/config/auth'
import { RequestBody } from './type'

export const draftMaintenanceCard = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'post',
    url: '/api/v1/standard-maintenance',
    data: {
      ...requestBody,
    },
  })
  return data
}
