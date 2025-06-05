import { BaseResponse } from '@/service/type'

type ProblemDetail = {
  id?: number | null
  code: string
  name: string
  isActive: boolean
  categoryParam: {
    id: number | null
    name: string
  } | null
}

export type RequestParams = {
  GET: { problemId: number }
}

export type Response = {
  GET: BaseResponse<ProblemDetail>
}
