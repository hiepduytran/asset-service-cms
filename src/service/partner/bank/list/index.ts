import { defaultOption } from '@/config/reactQuery'
import { QueryOptions, useQuery } from 'react-query'
import { RequestParamBank, ResponseBankList } from './type'
import { authResourceApi } from '@/config/auth'

export const getBankList = async (
  params: RequestParamBank['GET']
): Promise<ResponseBankList['GET']> => {
  const { data } = await authResourceApi({
    method: 'get',
    url: '/api/v1/bank/list',
    params,
  })

  return data
}

export const useQueryGetBankList = (
  params: RequestParamBank['GET'],
  options?: QueryOptions<ResponseBankList['GET']>
) => {
  return useQuery<ResponseBankList['GET']>(
    ['/api/v1/bank/list', params],
    () => getBankList(params),
    { ...defaultOption, ...options }
  )
}
