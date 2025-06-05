import { BaseResponse } from '@/service/type'

export type Token = {
  accessToken: string
  tokenType: string
  refreshToken: string
  expiresIn: number
  scopes: string[]
  userId: number
  tenantId: string
  jti: string
  orgId?: number
}

export type Response = {
  POST: BaseResponse<Token>
}
