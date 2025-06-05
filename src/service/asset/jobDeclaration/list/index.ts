import { authAssetApi } from '@/config/auth'
import { RequestParam, ResponseBody } from './type'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'

export const getListJobDeclaration = async (
  params?: RequestParam
): Promise<ResponseBody['ListJobDeclaration']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/job-declaration/list',
    params,
  })
  return data
}

export const useQueryGetListJobDeclaration = (
  params?: RequestParam,
  options?: any
) => {
  return useQuery(
    ['/api/v1/job-declaration/list', params],
    () => getListJobDeclaration(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getListJOverView = async (params?: {
  id: number
  typeDeclarations: string[]
}): Promise<ResponseBody['ListOverView']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/job-declaration/overview/details/list',
    params,
  })
  return data
}

export const useQueryGetListJOverView = (
  params?: {
    id: number
    typeDeclarations: string[]
  },
  options?: any
) => {
  return useQuery(
    ['/api/v1/job-declaration/overview/details/list', params],
    () => getListJOverView(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getListRepair = async (params?: {
  id: number
  typeDeclarations: string[]
}): Promise<ResponseBody['ListRepair']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/job-declaration/repair/details/list',
    params,
  })
  return data
}

export const useQueryGetListRepair = (
  params?: {
    id: number
    typeDeclarations: string[]
  },
  options?: any
) => {
  return useQuery(
    ['/api/v1/job-declaration/repair/details/list', params],
    () => getListRepair(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getListRepairDetail = async (params?: {
  id: number
}): Promise<ResponseBody['ListRepair']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/job-declaration/work/details/list',
    params,
  })
  return data
}

export const getListAssetSKU = async (params: {
  search?: string
  page: number
  size: number
}): Promise<ResponseBody['ListAssetSKU']> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/product',
    params,
  })
  return data
}
