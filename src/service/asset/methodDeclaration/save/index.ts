import { authAssetApi } from '@/config/auth'
import { RequestBody } from './type'

export const postMethodDeclaration = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authAssetApi({
    method: 'POST',
    url: '/api/v1/standard-method',
    data: requestBody,
  })
}

export const putMethodDeclaration = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authAssetApi({
    method: 'PUT',
    url: '/api/v1/standard-method',
    data: requestBody,
  })
}
