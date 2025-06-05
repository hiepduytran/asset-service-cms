import { PageResponse } from '@/service/type'

export type IncidentList = {
  asset: {
    id: number
    name: string
    code: string
  }
  product: {
    id: number
    name: string
    code: string
  }
  department: {
    id: number
    name: string
    code: string
  }
  incidentQuantity: number
  isActive: true
  isPlaned: true
}

export type Response = {
  GET: PageResponse<IncidentList[]>
}

export type RequestBody = {
  GET: {
    search?: string
    asset?: {
      id: number | null
      code: string
      name: string
    }
    assetId?: number | null
    departmentId?: number | null
    department?: {
      id: number | null
      code: string
      name: string
    }
    isActive?: boolean | null
    isPlaned?: boolean | null
    page?: number
    size?: number
  }
}
