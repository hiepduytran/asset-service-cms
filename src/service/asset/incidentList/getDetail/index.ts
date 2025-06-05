import { authAssetApi } from '@/config/auth'
import { RequestBody, Response } from './type'

export const getIncidentDetail = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/incident-recording-maintenance/list/incident-id',
    params,
  })
  return data
}
