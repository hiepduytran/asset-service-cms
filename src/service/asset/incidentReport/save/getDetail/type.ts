import { BaseResponse } from '@/service/type'
import { IncidentReportSave } from '../type'

export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<IncidentReportSave>
}
