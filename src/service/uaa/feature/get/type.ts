import { BaseResponse, PageResponse } from '@/service/type'

export interface Feature {
  id: number
  name: string
  code: string
  description: string
  isActive: boolean
  system: {
    id: number
    name: string
  }
  systemId: number
  apis: {
    id: number
    name: string
  }[]
  apiIds: number[]
  tagIds: number[]
  createdAt: string
  createdBy: number
  creator: string
}

export type ReqGetFeatureList = {
  search?: string
  systemId?: number
  isActive?: boolean
  page: number
  size: number
}

export type ResGetFeatureList = PageResponse<Feature[]>

export type ReqGetFeatureDetail = {
  featureId: number
}

export type ResGetFeatureDetail = BaseResponse<Feature>
