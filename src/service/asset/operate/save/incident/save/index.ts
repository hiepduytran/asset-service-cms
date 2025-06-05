import { authAssetApi } from '@/config/auth'

export const postIncident = async (requestBody: any): Promise<any> => {
  return await authAssetApi({
    method: 'post',
    url: '/api/v1/incident-recording-maintenance',
    data: requestBody,
  })
}

export const putIncident = async (requestBody: any): Promise<any> => {
  return await authAssetApi({
    method: 'put',
    url: '/api/v1/incident-recording-maintenance',
    data: requestBody,
  })
}
