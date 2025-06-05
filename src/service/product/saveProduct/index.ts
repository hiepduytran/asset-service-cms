import { authProductApi } from '@/config/auth'
import { RequestBodyProduct } from './type'

export const postSaveProduct = async (
  requestBody: RequestBodyProduct['SAVE']
): Promise<any> => {
  return await authProductApi({
    method: 'post',
    url: '/api/v1/internal/product-template/asset',
    data: requestBody,
  })
}
