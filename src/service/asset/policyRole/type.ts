import { BaseResponse } from '@/service/type'

export type PolicyRoleSave = {
  policy: {
    id: number
    name: string
    code: string
  } | null
  policyRoleMap:
    | Array<{
        role: {
          id: number
          name: string
          code: string
        } | null
        staff:
          | Array<{
              id: number
              name: string
              code: string
            }>
          | []
      }>
    | []
}

export type RequestBody = {
  POST: PolicyRoleSave
}

export type Response = {
  GET: BaseResponse<PolicyRoleSave>
}
