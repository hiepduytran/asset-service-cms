import { authAssetApi } from '@/config/auth'
import { RequestBody } from './type'

export const changeStatusApprove = async (
  params: RequestBody['SAVE']
): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'put',
    url: '/api/v1/allocation-request/approve',
    data: params,
  })
  return data
}
