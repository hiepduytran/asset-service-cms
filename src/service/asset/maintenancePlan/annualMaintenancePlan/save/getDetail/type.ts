import { BaseResponse } from '@/service/type'
import { WeeklyMaintenancePlanSave } from '../../../weeklyMaintenancePlan/save/type'

export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<WeeklyMaintenancePlanSave>
}
