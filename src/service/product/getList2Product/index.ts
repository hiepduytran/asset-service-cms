import { authProductApi } from '@/config/auth'
import { ResponseBody } from './type'

export const getList2Product = async (
  params: any
): Promise<ResponseBody['GET']['List2Product']> => {
  const { data } = await authProductApi({
    method: 'GET',
    url: '/api/v2/product/list2',
    params,
  })
  return data
}
