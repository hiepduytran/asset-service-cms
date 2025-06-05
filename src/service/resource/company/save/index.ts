import { authResourceApi } from '@/config/auth'
import { RequestBody } from './type'

export const postCompany = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authResourceApi({
    method: 'post',
    url: '/api/v1/companies',
    data: requestBody,
  })
}

export const updateCompany = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  const { id } = requestBody
  return await authResourceApi({
    method: 'put',
    url: `/api/v1/companies?id=${id}`,
    data: requestBody,
  })
}
