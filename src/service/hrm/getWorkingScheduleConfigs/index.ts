import { authHrmApi } from '@/config/auth'

export const getWorkingScheduleConfigs = async (params: any): Promise<any> => {
  const { data } = await authHrmApi({
    method: 'GET',
    url: '/api/v1/working-schedule-configs/list',
    params,
  })
  return data
}
