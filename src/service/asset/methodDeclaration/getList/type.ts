import { PageResponse } from '@/service/type'

export type MethodDeclaration = {
  id: number
  code: string
  name: string
  groupStandard: {
    id: number
    name: string
    code: string
  }
  product: {
    id: number
    name: string
    code: string
  }
  isActive: boolean
}

export type Response = {
  GET: PageResponse<MethodDeclaration[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    groupStandardId?: number | null
    isActive?: boolean | null
    page: number
    size: number
  }
}
