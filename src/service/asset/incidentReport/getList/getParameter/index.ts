import { authAssetApi } from '@/config/auth'
import { RequestBody, Response } from './type'

export const getIncidentReportParameter = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/incident-recording-maintenance/incident-report/detail-list',
    params,
  })
  return data
}
