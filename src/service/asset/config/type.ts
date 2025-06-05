import { BaseResponse } from '@/service/type'

export type Config = {
  id?: number
  internalWarehouse: {
    id: number
    code: string
    name: string
  } | null
  isApprove: boolean
}

export type RequestBody = {
  POST: Config
}

export type Response = {
  GET: BaseResponse<Config>
}
