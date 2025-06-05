import { authAssetApi } from '@/config/auth'
import { ResponseBody } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getAutoMaintenanceHistoryErrorDetail = async (params: {
  shiftSequenceId: number
}): Promise<ResponseBody['GET']['AutoMaintenanceError']> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/maintenance/history/error',
    params,
  })
  return data
}

export const useGetAutoMaintenanceHistoryErrorDetail = (
  params: { shiftSequenceId: number },
  options?: any
) => {
  return useQuery<ResponseBody['GET']['AutoMaintenanceError']>(
    ['/api/v1/maintenance/history/error', params],
    () => getAutoMaintenanceHistoryErrorDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getAutoMaintenancesHistory = async (params: {
  assetId: number
  date?: string
}): Promise<ResponseBody['GET']['MaintenanceHistory']> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/maintenance/history',
    params,
  })
  return data
}

export const useGetAutoMaintenancesHistory = (
  params: { assetId: number; date?: string },
  options?: any
) => {
  return useQuery<ResponseBody['GET']['MaintenanceHistory']>(
    ['/api/v1/maintenance/history', params],
    () => getAutoMaintenancesHistory(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getAutoMaintenancesHistoryIncident = async (params: {
  assetId: number
  incidentLocationId?: number | null
  severityManagementId?: number | null
  isHandle?: boolean | null
  startDate?: string
  endDate?: string
  page: number
  size: number
}): Promise<ResponseBody['GET']['MaintenanceHistoryIncident']> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/incident-recording-maintenance/list/history-self-maintenance',
    params,
  })
  return data
}

export const useGetAutoMaintenancesHistoryIncident = (
  params: {
    assetId: number
    incidentLocationId?: number | null
    severityManagementId?: number | null
    isHandle?: boolean | null
    startDate?: string
    endDate?: string
    page: number
    size: number
  },
  options?: any
) => {
  return useQuery<ResponseBody['GET']['MaintenanceHistoryIncident']>(
    [
      '/api/v1/incident-recording-maintenance/list/history-self-maintenance',
      params,
    ],
    () => getAutoMaintenancesHistoryIncident(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
