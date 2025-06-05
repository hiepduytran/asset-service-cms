import { authAssetApi } from '@/config/auth'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getIncidentHistory = async (params: any): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/incident-recording-maintenance/history-by-id',
    params,
  })
  return data
}

export const useQueryIncidentHistory = (params: any, options?: any) => {
  return useQuery<any>(
    ['/api/v1/incident-recording-maintenance/history-by-id', params],
    () => getIncidentHistory(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
