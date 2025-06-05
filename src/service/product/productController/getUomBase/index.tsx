import { authProductApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getUomBaseOfProduct = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authProductApi({
    method: 'get',
    url: '/api/v1/product-with-uom/uom',
    params,
  })
  return data
}
