import { authResourceApi } from '@/config/auth'
import { QueryObserverOptions, useQuery } from 'react-query'
import { RequestParamBank } from '../list/type'
import { ResponseBankDetail } from './type'
import { defaultOption } from '@/config/reactQuery'

export const getBankById = async (
  params: RequestParamBank['GET_DETAIL'],
): Promise<ResponseBankDetail['GET_DETAIL']> => {
  const { data } = await authResourceApi({
    url: '/api/v1/bank',
    method: 'get',
    params,
  })
  return data
}

export const useQueryGetBankById = (
  params: RequestParamBank['GET_DETAIL'],
  options?: QueryObserverOptions<ResponseBankDetail['GET_DETAIL']>,
) => {
  return useQuery<ResponseBankDetail['GET_DETAIL']>(
    ['/api/v1/bank', params],
    () => getBankById(params),
    { ...defaultOption, ...options },
  )
}
