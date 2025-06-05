import { authAssetApi } from '@/config/auth'

export const postMachineStop = async (requestBody: any): Promise<any> => {
  return await authAssetApi({
    method: 'post',
    url: '/api/v1/shutdown-information',
    data: requestBody,
  })
}

export const putMachineStop = async (requestBody: any): Promise<any> => {
  return await authAssetApi({
    method: 'put',
    url: '/api/v1/shutdown-information',
    data: requestBody,
  })
}
