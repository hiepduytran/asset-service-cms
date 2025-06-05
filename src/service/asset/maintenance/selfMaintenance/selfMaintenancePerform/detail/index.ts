import { authAssetApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { BaseResponse } from '@/service/type'
import { useQuery } from 'react-query'
import { IncidentRecordingMaintenanceAuto } from '../dialog/type'
import { ResponseBody } from './type'

export const getAutoMaintenances = async (params: {
  date?: string
  maintenanceScheduleId: number
  isBefore?: boolean
  maintenanceShiftIds?: number[]
}): Promise<ResponseBody['GET']['AutoMaintenance']> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/auto-maintenance',
    params,
  })
  return data
}

export const useGetAutoMaintenances = (
  params: {
    date?: string
    maintenanceScheduleId: number
    isBefore?: boolean
    maintenanceShiftIds?: number[]
  },
  options?: any
) => {
  return useQuery<ResponseBody['GET']['AutoMaintenance']>(
    ['/api/v1/auto-maintenance', params],
    () => getAutoMaintenances(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getAutoMaintenanceDetailError = async (params: {
  id: number
}): Promise<BaseResponse<IncidentRecordingMaintenanceAuto>> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/incident-recording-maintenance/detail/by-id',
    params,
  })
  return data
}

export const useGetAutoMaintenanceDetailError = (
  params: {
    id: number
  },
  options?: any
) => {
  return useQuery<BaseResponse<IncidentRecordingMaintenanceAuto>>(
    ['/api/v1/incident-recording-maintenance/detail/by-id', params],
    () => getAutoMaintenanceDetailError(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
