import { authResourceApi } from '@/config/auth'
import { RequestBodyBank } from './type'

export const postBank = async (
  requestBody: RequestBodyBank['SAVE']
): Promise<any> => {
  const { data } = await authResourceApi({
    url: '/api/v1/bank',
    method: 'post',
    data: requestBody,
  })
  return data
}

export const putBank = async (
  requestBody: RequestBodyBank['SAVE']
): Promise<any> => {
  const { data } = await authResourceApi({
    url: '/api/v1/bank',
    method: 'put',
    data: requestBody,
    params: { bankId: requestBody?.id },
  })
  return data
}
