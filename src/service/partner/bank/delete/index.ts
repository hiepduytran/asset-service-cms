import { authResourceApi } from '@/config/auth'
import { RequestParamBank } from '../list/type'

export const deleteBank = async (
  params: RequestParamBank['DELETE'],
): Promise<any> => {
  const { data } = await authResourceApi({
    url: '/api/v1/bank',
    method: 'delete',
    params,
  })
  return data
}
