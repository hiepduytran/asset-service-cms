import { PageResponse } from '@/service/type'

export type ListOperate = {
  id: number
  code: string
  asset: {
    id: number
    name: string
    code: string
  }
  user: {
    id: number
    name: string
    code: string
  }
  shift: {
    id: number
    name: string
    code: string
  }
  productionRequest: {
    id: number
    name: string
    code: string
  }
  stage: {
    id: number
    name: string
    code: string
  }
  productArea: {
    id: number
    name: string
    code: string
  }
  status: string
  updateDate: string
}

export type Response = {
  GET: PageResponse<ListOperate[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
    stage?: {
      id: number | null
      name: string
    }
    shift?: {
      id: number | null
      name: string
    }
    asset?: {
      id: number | null
      name: string
    }
    productionRequest?: {
      id: number | null
      name: string
      code: string
    }
    evaluateAsset?: string | null
    start?: string
    end?: string
  }
}
