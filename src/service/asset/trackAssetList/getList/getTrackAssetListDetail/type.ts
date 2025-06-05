import { PageResponse } from '@/service/type'

export type TrackAssetListDetail = {
  code: string
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
  checkingType: string
}

export type Response = {
  GET: PageResponse<TrackAssetListDetail[]>
}

export type RequestBody = {
  GET: {
    search?: string
    allocationId?: number | null
    allocationChooseType?: string | null
    date?: string
    status?: string | null
    page?: number
    size?: number
  }
}
