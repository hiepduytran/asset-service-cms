import { authAssetApi } from '@/config/auth'
import { AssetRecoverySave, ResponseBody } from './type'
import { IncidentDetail } from '../detail/type'

export const postAssetRecovery = async (
  requestBody: AssetRecoverySave
): Promise<ResponseBody['ACTION']['AssetRecoverySave']> => {
  const { data } = await authAssetApi({
    method: 'post',
    url: '/api/v1/asset-recovery',
    data: requestBody,
  })
  return data
}

export const putAssetRecovery = async (
  requestBody: AssetRecoverySave
): Promise<ResponseBody['ACTION']['AssetRecoverySave']> => {
  const { data } = await authAssetApi({
    method: 'put',
    url: '/api/v1/asset-recovery',
    data: requestBody,
  })
  return data
}

export const postIncidentLog = async (requestBody: IncidentDetail) => {
  const { data } = await authAssetApi({
    method: 'post',
    url: '/api/v1/incident-recording',
    data: requestBody,
  })
  return data
}
