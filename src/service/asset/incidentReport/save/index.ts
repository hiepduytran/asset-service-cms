import { authAssetApi } from '@/config/auth'
import { RequestBody } from './type'

export const postIncidentReport = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'post',
    url: '/api/v1/incident-report',
    data: requestBody,
  })
}

export const putIncidentReport = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'put',
    url: '/api/v1/incident-report',
    data: requestBody,
  })
}
