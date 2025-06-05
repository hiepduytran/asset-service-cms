import { authAssetApi } from '@/config/auth'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getIncidentList = async (params: any): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/incident-recording-maintenance',
    params,
  })
  return data
}

export const useQueryIncidentList = (params: any, options?: any) => {
  return useQuery<any>(
    ['/api/v1/incident-recording-maintenance', params],
    () => getIncidentList(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
// Operate
export const getIncidentListByIdOperate = async (params: any): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/incident-recording-maintenance/id',
    params,
  })
  return data
}

export const useQueryIncidentListByIdOperate = (params: any, options?: any) => {
  return useQuery<any>(
    ['/api/v1/incident-recording-maintenance/id', params],
    () => getIncidentListByIdOperate(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
// Incident Report
export const getIncidentListByIdIncidentReport = async (
  params: any
): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/incident-recording-maintenance/incident-report/incident-ids',
    params,
  })
  return data
}

export const useQueryIncidentListByIdIncidentReport = (
  params: any,
  options?: any
) => {
  return useQuery<any>(
    [
      '/api/v1/incident-recording-maintenance/incident-report/incident-ids',
      params,
    ],
    () => getIncidentListByIdIncidentReport(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
