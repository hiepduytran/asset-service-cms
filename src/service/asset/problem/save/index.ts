import { authAssetApi } from '@/config/auth'
import { RequestBody } from './type'

export const postProblem = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authAssetApi({
    method: 'post',
    url: '/api/v1/problem',
    data: requestBody,
  })
}

export const putProblem = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authAssetApi({
    method: 'put',
    url: '/api/v1/problem',
    data: requestBody,
  })
}
