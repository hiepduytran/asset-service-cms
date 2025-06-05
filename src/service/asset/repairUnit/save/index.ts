import { authAssetApi } from '@/config/auth'

// NEW
export const postRepairUnitNew = async (requestBody: any): Promise<any> => {
  return await authAssetApi({
    method: 'post',
    url: '/api/v1/partner-asset-map/new',
    data: requestBody,
  })
}

// AVAILABLE
export const postRepairUnitAvailable = async (
  requestBody: any
): Promise<any> => {
  return await authAssetApi({
    method: 'post',
    url: '/api/v1/partner-asset-map/available',
    data: requestBody,
  })
}
export const putRepairUnitAvailable = async (
  requestBody: any
): Promise<any> => {
  return await authAssetApi({
    method: 'put',
    url: '/api/v1/partner-asset-map/available',
    data: requestBody,
  })
}
