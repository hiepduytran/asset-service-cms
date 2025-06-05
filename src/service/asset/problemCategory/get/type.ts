import { BaseResponse } from '@/service/type'

type ProblemCategoryDetail = {
  id?: number | null
  code: string
  name: string
  isActive: boolean
}

export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<ProblemCategoryDetail>
}
