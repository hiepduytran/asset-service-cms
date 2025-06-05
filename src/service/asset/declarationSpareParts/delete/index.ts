import { authAssetApi } from '@/config/auth'
import { RequestBody } from './type'

export const deleteAssetAccessory = async (
  params: RequestBody['DELETE']
): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'delete',
    url: `/api/v1/config/accessory`,
    params,
  })
  return data
}
