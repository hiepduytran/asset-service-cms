import { BaseResponse, PageResponse } from '@/service/type'

export type ReasonList = {
  id: number
  code: string
  name: string
  isForeign: boolean
  isActive: boolean
  reasonLine: {
    id: number
    system: {
      id: number
      name: string
      code: string
    }
    features: {
      id: number
      name: string
      code: string
    }[]
  }[]
}

export type FeatureList = {
  id: number
  name: string
  code: string
}

export type Response = {
  GET: PageResponse<ReasonList[]>
  FeatureList: BaseResponse<FeatureList[]>
}

export type RequestBody = {
  GET: {
    search?: string
    isActive?: boolean | null
    page: number
    size: number
  }
  FeatureList: {
    id: number
  }
}
