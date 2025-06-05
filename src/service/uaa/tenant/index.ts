import { authUaaApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'

const END_POINT = '/public-api/v1/tenant/verify-domain'

export const checkTenantExits = async (domain: string): Promise<any> => {
  const { data } = await authUaaApi({
    method: 'get',
    url: END_POINT,
    params: {
      domain,
    },
  })
  return data
}

export const useQueryCheckTenantExits = (params: string, options?: any) => {
  return useQuery<any>([END_POINT, params], () => checkTenantExits(params), {
    ...defaultOption,
    ...options,
  })
}
