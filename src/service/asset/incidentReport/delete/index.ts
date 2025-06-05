import { authAssetApi } from '@/config/auth'
import { RequestBody, Response } from './type'

export const deleteIncidentReport = async (
  params: RequestBody['DELETE']
): Promise<Response['DELETE']> => {
  const { data } = await authAssetApi({
    method: 'delete',
    url: `/api/v1/incident-report`,
    params,
  })
  return data
}
