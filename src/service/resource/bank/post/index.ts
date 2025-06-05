import { authResourceApi } from '@/config/auth'
import { RequestBody } from './type'

export const postNewBank = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  const url = `/api/v1/bank`
  return await authResourceApi({
    method: 'post',
    url,
    data: requestBody,
  })
}
