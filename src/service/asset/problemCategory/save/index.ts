import { authAssetApi } from '@/config/auth'
import { RequestBody } from './type'

export const postProblemCategory = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authAssetApi({
    method: 'POST',
    url: '/api/v1/problem-category',
    data: requestBody,
  })
}

export const putProblemCategory = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authAssetApi({
    method: 'PUT',
    url: '/api/v1/problem-category',
    data: requestBody,
  })
}
