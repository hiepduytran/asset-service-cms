import { authResourceApi } from '@/config/auth'
import { RequestBody, RequestParam } from './type'

export const putSTKBankForUserLogin = async (
  requestBody: RequestBody['PUT']
): Promise<any> => {
  const url = '/api/v1/companies/update-banks'
  return await authResourceApi({
    method: 'put',
    url,
    data: requestBody.data,
  })
}
