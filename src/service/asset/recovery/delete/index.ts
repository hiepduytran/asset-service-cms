import { authAssetApi } from '@/config/auth'
import { RequestBody } from '../../allocation/delete/type'

export const putCancelAssetRecovery = async (requestBody: {
  id: number
  status: string
}): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'put',
    url: `/api/v1/allocation-request/recover/approve`,
    data: requestBody,
  })
  return data
}
