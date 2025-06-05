import { authAssetApi } from '@/config/auth'
import { IncidentDetail } from '../detail/type'
import { BaseResponse } from '@/service/type'
import { IncidentDetailAction } from './type'

export const postIncidentLog = async (requestBody: IncidentDetailAction) => {
  const { data } = await authAssetApi({
    method: 'post',
    url: '/api/v1/incident-recording',
    data: requestBody,
  })
  return data
}

export const putIncidentLog = async (requestBody: IncidentDetailAction) => {
  const { data } = await authAssetApi({
    method: 'put',
    url: '/api/v1/incident-recording',
    data: requestBody,
  })
  return data
}

export const deleteIncidentLogList = async (params: {
  id: number
}): Promise<BaseResponse<{ id: number }>> => {
  const { data } = await authAssetApi({
    method: 'delete',
    url: '/api/v1/incident-recording',
    params,
  })
  return data
}
