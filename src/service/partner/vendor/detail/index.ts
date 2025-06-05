import { authResourceApi } from '@/config/auth'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getVendorDetail = async (params: any): Promise<any> => {
  const { data } = await authResourceApi({
    method: 'get',
    url: '/api/v1/vendor/partners',
    params,
  })
  return data
}

export const useQueryVendorDetail = (params: any, options?: any) => {
  return useQuery(
    ['/api/v1/vendor/partners', params],
    () => getVendorDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
