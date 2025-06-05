import { BaseResponse } from '@/service/type'

type MethodDeclarationDetail = {
  id?: number | null
  code: string
  name: string
  groupStandard: {
    id: number
    name: string
    code: string
  } | null
  product: {
    id: number
    name: string
    code: string
  } | null
  isActive: true
}

export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<MethodDeclarationDetail>
}
