import { authAssetApi } from '@/config/auth'
import { BaseResponse } from '@/service/type'
import { JobDeclarationDetail } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getJobDeclaration = async (params: {
  id: number
}): Promise<BaseResponse<JobDeclarationDetail>> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/job-declaration',
    params,
  })
  return data
}

export const useQueryGetJobDeclaration = (
  params: {
    id: number
  },
  options?: any
) => {
  return useQuery<BaseResponse<JobDeclarationDetail>>(
    ['/api/v1/job-declaration', params],
    () => getJobDeclaration(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const postJobDeclaration = async (
  requestBody: JobDeclarationDetail
): Promise<BaseResponse<{ id: number }>> => {
  const { data } = await authAssetApi({
    method: 'post',
    url: '/api/v1/job-declaration',
    data: requestBody,
  })
  return data
}

export const putJobDeclaration = async (
  requestBody: JobDeclarationDetail
): Promise<BaseResponse<{ id: number }>> => {
  const { data } = await authAssetApi({
    method: 'put',
    url: '/api/v1/job-declaration',
    data: requestBody,
  })
  return data
}

export const deleteJobDeclaration = async (params: {
  id: number
}): Promise<BaseResponse<{ id: number }>> => {
  const { data } = await authAssetApi({
    method: 'delete',
    url: '/api/v1/job-declaration',
    params,
  })
  return data
}
