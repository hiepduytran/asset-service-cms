import { authAssetApi } from '@/config/auth'

export const deleteMachineStop = async (params: any): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'delete',
    url: `/api/v1/shutdown-information`,
    params,
  })
  return data
}
