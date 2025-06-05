import { authAssetApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams, ResponseBody } from './type'

export const getIncidentLogListTime = async (
  params: RequestParams['LIST']['IncidentLogListTime']
): Promise<ResponseBody['LIST']['IncidentLogListTime']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/incident-recording/list/time',
    params,
  })
  return data
}

export const useQueryGetIncidentLogListTime = (
  params: RequestParams['LIST']['IncidentLogListTime'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/incident-recording/list/time', params],
    () => getIncidentLogListTime(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getIncidentLogListTimeDetail = async (params: {
  id: number
}): Promise<ResponseBody['LIST']['IncidentLogListTimeDetail']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/incident-recording/details/list/time',
    params,
  })
  return data
}

export const getIncidentLogListIdentity = async (
  params: RequestParams['LIST']['IncidentLogListIdentity']
): Promise<ResponseBody['LIST']['IncidentLogListIdentity']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/incident-recording/list/asset',
    params,
  })
  return data
}

export const useQueryGetIncidentLogListIdentity = (
  params: RequestParams['LIST']['IncidentLogListIdentity'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/incident-recording/list/asset', params],
    () => getIncidentLogListIdentity(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

// export const getAllIncidentRecordingMaintenance = async (params: {
//   isGetAll: boolean
// }): Promise<ResponseBody['LIST']['AllIncidentRecordingMaintenance']> => {
//   const { data } = await authAssetApi({
//     method: 'get',
//     url: '/api/v1/incident-recording-maintenance',
//     params,
//   })
//   return data
// }

export const getIncidentRecordingMaintenance = async (params: {
  page?: number
  size?: number
  assetId: number
  isGetAll: boolean
}): Promise<ResponseBody['LIST']['IncidentRecordingMaintenance']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/incident-recording-maintenance',
    params,
  })
  return data
}

export const useQueryGetIncidentRecordingMaintenance = (
  params: {
    page?: number
    size?: number
    isGetAll: boolean
    assetId: number
  },
  options?: any
) => {
  return useQuery(
    ['/api/v1/incident-recording-maintenance', params],
    () => getIncidentRecordingMaintenance(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getIncidentRecordingMaintenanceIsUpdate = async (params: {
  id: number | null
  isGetAll: boolean
  assetId: number
  page?: number
  size?: number
}): Promise<ResponseBody['LIST']['IncidentRecordingMaintenance']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset-recovery/details/incident',
    params,
  })
  return data
}

export const useQueryGetIncidentRecordingMaintenanceIsUpdate = (
  params: {
    id: number | null
    isGetAll: boolean
    assetId: number
    page?: number
    size?: number
  },
  options?: any
) => {
  return useQuery(
    ['/api/v1/asset-recovery/details/incident', params],
    () => getIncidentRecordingMaintenanceIsUpdate(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
