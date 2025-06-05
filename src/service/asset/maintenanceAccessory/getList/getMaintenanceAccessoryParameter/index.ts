import { authAssetApi } from '@/config/auth'
import { RequestBody } from './type'
import { Response } from './type'

export const getMaintenanceAccessoryParameter = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/config/maintenance/accessory-line/list',
    params,
  })
  return data
}
