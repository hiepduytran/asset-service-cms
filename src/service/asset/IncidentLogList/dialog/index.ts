import { authAssetApi } from '@/config/auth'
import { IncidentDetail } from '../detail/type'
import { IncidentRecordingMaintenance } from './type'
import { BaseResponse } from '@/service/type'

export const postDialogIncident = async (
  requestBody: IncidentRecordingMaintenance
): Promise<
  BaseResponse<{
    id: number
  }>
> => {
  const { data } = await authAssetApi({
    method: 'post',
    url: '/api/v1/incident-recording-maintenance',
    data: requestBody,
  })
  return data
}

export const putDialogIncident = async (
  requestBody: IncidentRecordingMaintenance
): Promise<
  BaseResponse<{
    id: number
  }>
> => {
  const { data } = await authAssetApi({
    method: 'put',
    url: '/api/v1/incident-recording-maintenance',
    data: requestBody,
  })
  return data
}

export const deleteDialogIncident = async (params: {
  id: number
}): Promise<
  BaseResponse<{
    id: number
  }>
> => {
  const { data } = await authAssetApi({
    method: 'delete',
    url: '/api/v1/incident-recording-maintenance',
    params,
  })
  return data
}

export const getListAssetAccessoryId = async (params: {
  productId: number
}) => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/config/accessory/accessory',
    params,
  })
  return data
}
