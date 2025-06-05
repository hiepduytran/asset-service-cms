import { PageResponse } from '@/service/type'

export type TrackAssetList = {
  images: string[]
  id: number
  code: string
  name: string
  category: {
    id: number
    name: string
    code: string
  }
  quantity: number
  uom: {
    id: number
    name: string
    code: string
  }
  assetAllocationIds: number[]
}

export type TrackAssetListIdentifierCode = {
  code: string
  sku: string
  dic: string
  name: string
  category: {
    id: number
    name: string
    code: string
  }
  images: string[]
  assetAllocationType: string
  requestDate: string
  staff: {
    id: number
    name: string
    code: string
  }
  recordConditionType: string
  allocationChooseType: string
  checkingType: string
}

export type Response = {
  GET: PageResponse<TrackAssetList[]>
}

export type ResponseIdentifierCode = {
  GET: PageResponse<TrackAssetListIdentifierCode[]>
}

export type RequestBody = {
  GET: {
    search?: string
    categoryId?: number | null
    sourceEnum?: string | null
    date?: string
    allocationChooseType?: string
    page?: number
    size?: number
  }
}
