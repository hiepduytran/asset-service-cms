import { BaseResponse } from '@/service/type'

export type ResponseBody = {
  POST: {
    RequestMaintenancePart: BaseResponse<{ id: number }>
  }
}
