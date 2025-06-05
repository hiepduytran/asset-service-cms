import { authAssetApi } from '@/config/auth'
import { RequestBody, Response } from './type'

export const deleteProblemCategory = async (
  params: RequestBody['DELETE']
): Promise<Response['DELETE']> => {
  const { data } = await authAssetApi({
    method: 'delete',
    url: `/api/v1/problem-category`,
    params,
  })
  return data
}
