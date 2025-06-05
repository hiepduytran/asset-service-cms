import { authResourceApi } from '@/config/auth'
import { RequestParams } from './type'

export const deleteCompany = async (
  params: RequestParams['DELETE']
): Promise<any> => {
  const { data } = await authResourceApi({
    method: 'delete',
    url: `/api/v1/companies`,
    params,
  })
  return data ? data.data : data
}
