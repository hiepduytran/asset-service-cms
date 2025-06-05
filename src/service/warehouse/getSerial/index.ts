import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { authWarehouseApi } from '@/config/auth'

export const getSerialManagement = async (
  params: RequestBody['GET']
): Promise<any> => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: `/api/v1/internal/stock-serial-lot/serials`,
    params,
  })

  return data ? data.data : data
}

export const useQueryGetSerialManagement = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/internal/stock-serial-lot/serials', params],
    () => getSerialManagement(params),
    { ...defaultOption, ...options }
  )
}
