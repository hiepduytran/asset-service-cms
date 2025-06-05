import { authResourceApi } from '@/config/auth'
import { RequestBody, Response } from './type'

export const getListCountry = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authResourceApi({
    method: 'GET',
    url: '/api/v1/countries/list',
    params,
  })
  return data
}
