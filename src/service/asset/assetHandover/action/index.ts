import { authAssetApi } from '@/config/auth'
import { BaseResponse } from '@/service/type'
import { PostTransferAsset } from '../detail/type'

export const postAssetHandover = async (
  requestBody: PostTransferAsset
): Promise<BaseResponse<{ id: number }>> => {
  const { data } = await authAssetApi({
    method: 'post',
    url: '/api/v1/transfer-asset',
    data: requestBody,
  })
  return data
}
