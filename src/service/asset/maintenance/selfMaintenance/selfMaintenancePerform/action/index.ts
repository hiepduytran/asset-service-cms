import { authAssetApi } from '@/config/auth'
import { BaseResponse } from '@/service/type'
import { IncidentRecordingMaintenanceAuto } from '../dialog/type'
import { RequestBody, ResponseBody } from './type'

export const putAutoMaintenanceError = async (
  requestBody: RequestBody['PUT']['AutoMaintenanceError']
): Promise<ResponseBody['PUT']['AutoMaintenanceError']> => {
  const { data } = await authAssetApi({
    method: 'put',
    url: '/api/v1/auto-maintenance/error',
    data: {
      ...requestBody,
    },
  })
  return data
}

export const putAutoMaintenanceApprove = async (
  requestBody: RequestBody['PUT']['AutoMaintenanceApprove']
): Promise<ResponseBody['PUT']['AutoMaintenanceApprove']> => {
  const { data } = await authAssetApi({
    method: 'put',
    url: '/api/v1/auto-maintenance/approve',
    data: {
      maintenanceShiftId: requestBody.maintenanceShiftId,
      sequences: requestBody.sequences,
    },
    params: {
      isBackUp: requestBody.isBackUp,
    },
  })
  return data
}

export const postDialogIncidentAuto = async (
  requestBody: IncidentRecordingMaintenanceAuto
): Promise<
  BaseResponse<{
    id: number
  }>
> => {
  const { data } = await authAssetApi({
    method: 'post',
    url: '/api/v1/maintenance-schedule-incident',
    data: requestBody,
  })
  return data
}

export const putDialogIncidentAuto = async (
  requestBody: IncidentRecordingMaintenanceAuto
): Promise<
  BaseResponse<{
    id: number
  }>
> => {
  const { data } = await authAssetApi({
    method: 'put',
    url: '/api/v1/maintenance-schedule-incident',
    data: requestBody,
  })
  return data
}

export const deleteDialogIncidentAuto = async (params: {
  id: number
}): Promise<
  BaseResponse<{
    id: number
  }>
> => {
  const { data } = await authAssetApi({
    method: 'delete',
    url: '/api/v1/maintenance-schedule-incident',
    params,
  })
  return data
}

export const deleteDialogIncidentIdsAuto = async (params: {
  ids: number[]
}): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'delete',
    url: '/api/v1/incident-recording-maintenance/ids',
    params,
  })
  return data
}

export const deleteSequenceAuto = async (params: {
  ratingId: number
}): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'delete',
    url: '/api/v1/audit-maintenance/rating',
    params,
  })
  return data
}
