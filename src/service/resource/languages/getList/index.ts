import { authResourceApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'

export const getLanguageList = async (params: any): Promise<any> => {
  const { data } = await authResourceApi({
    method: 'get',
    url: '/api/v1/languages/list',
    params,
  })
  return data.data
}

export const useQueryGetLanguageList = (params: any, options?: any) => {
  return useQuery<any>(
    ['/api/v1/languages/list', params],
    () => getLanguageList(params),
    { ...defaultOption, ...options }
  )
}
