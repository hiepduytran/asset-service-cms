import { authAssetApi } from '@/config/auth'
import { RequestBody, Response } from './type'

export const getAccessoryByProductId = async (
  params?: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/config/accessory/accessory',
    params,
  })
  return data
}
