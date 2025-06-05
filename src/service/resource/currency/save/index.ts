import { authResourceApi } from '@/config/auth'
import { RequestBody } from './type'

export const postCurrency = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authResourceApi({
    method: 'post',
    url: '/api/v1/currency',
    data: requestBody,
  })
}

export const putCurrency = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authResourceApi({
    method: 'put',
    url: '/api/v1/currency',
    data: requestBody,
    params: {
      currencyId: requestBody.currencyId,
    },
  })
}
