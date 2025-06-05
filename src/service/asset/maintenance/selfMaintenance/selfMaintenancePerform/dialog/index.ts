import { authAssetApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { ResponseBody } from './type'

export const getIncidentRecordingMaintenanceAuto = async (params: {
  page?: number
  size?: number
  isGetAll: boolean
  assetId: number
  incidentLocationIds?: number[]
}): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/incident-recording-maintenance',
    params,
  })
  return data
}

export const useQueryGetIncidentRecordingMaintenanceAuto = (
  params: {
    page?: number
    size?: number
    isGetAll: boolean
    assetId: number
    incidentLocationIds?: number[]
  },
  options?: any
) => {
  return useQuery(
    ['/api/v1/incident-recording-maintenance', params],
    () => getIncidentRecordingMaintenanceAuto(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getMaintenanceScheduleIncidentAllocation = async (params: {
  maintenanceScheduleId: number
}): Promise<ResponseBody['GET']['MaintenanceScheduleIncidentAllocation']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/maintenance-schedule-incident/allocation',
    params,
  })
  return data
}

export const useQueryGetMaintenanceScheduleIncidentAllocation = (
  params: {
    maintenanceScheduleId: number
  },
  options?: any
) => {
  return useQuery(
    ['/api/v1/maintenance-schedule-incident/allocation', params],
    () => getMaintenanceScheduleIncidentAllocation(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
