import { authResourceApi } from '@/config/auth'
import { RequestBody } from './type'

export const postSignatureConfig = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authResourceApi({
    method: 'post',
    url: `/api/v1/config-signature`,
    data: requestBody,
  })
}
