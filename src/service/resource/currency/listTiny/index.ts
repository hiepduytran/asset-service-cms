import { authResourceApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { Response } from './type'

export const getListTinyCurrencies = async (params: any): Promise<any> => {
  const { data } = await authResourceApi({
    method: 'get',
    url: `/api/v1/currency/list-tiny`,
    params,
  })
  return data
}

export const useQueryGetListTinyCurrencies = (params: any) => {
  return useQuery<Response['GET']>(
    ['/api/v1/currency/list-tiny', params],
    () => getListTinyCurrencies(params),
    { ...defaultOption }
  )
}
