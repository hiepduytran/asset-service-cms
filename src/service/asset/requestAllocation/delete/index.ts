import { authAssetApi } from '@/config/auth'
import { RequestBody, Response } from './type'

export const deleteRequestAllocation = async (
  params: RequestBody['DELETE']
): Promise<Response['DELETE']> => {
  const { data } = await authAssetApi({
    method: 'delete',
    url: `/api/v1/allocation-request`,
    params,
  })
  return data
}
