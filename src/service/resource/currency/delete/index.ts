import { authResourceApi } from '@/config/auth'
import { RequestParams } from './type'

export const deleteCurrency = async (
  params: RequestParams['DELETE']
): Promise<any> => {
  const { data } = await authResourceApi({
    method: 'delete',
    url: `/api/v1/currency`,
    params,
  })
  return data
}
