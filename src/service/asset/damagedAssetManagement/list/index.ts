import { authAssetApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { Response } from './type'

export const getIncidentRecordingManageList = async (params: {
  search?: string
  date?: string
  page: number
  size: number
}): Promise<Response['IncidentRecordingManageListList']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/incident-recording/manage/list',
    params,
  })
  return data
}

export const useQueryGetIncidentRecordingManageList = (
  params: {
    search?: string
    date?: string
    page: number
    size: number
  },
  options?: any
) => {
  return useQuery<Response['IncidentRecordingManageListList']>(
    ['/api/v1/incident-recording/manage/list', params],
    () => getIncidentRecordingManageList(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
