import { BaseResponse } from '@/service/type'

export interface Feature {
  id: number
  name: string
  description: string
  isActive: boolean
  apis: Api[]
  tags: {
    id: number
    name: string
  }[]
  tagIds: number[]
  createdAt: string
  createdBy: number
  creator: string
}

export interface Api {
  id: number
  name: string
  serviceId: number
  path: string
  method: string
}

export type ReqGetFeatureOfSystem = {
  systemId: number
}

export type ResGetFeatureOfSystem = BaseResponse<Feature[]>
