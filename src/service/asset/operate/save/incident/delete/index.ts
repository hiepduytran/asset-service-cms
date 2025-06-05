import { authAssetApi } from '@/config/auth'

export const deleteIncident = async (params: any): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'delete',
    url: `/api/v1/incident-recording-maintenance`,
    params,
  })
  return data
}
