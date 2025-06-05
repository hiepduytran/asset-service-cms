import { PageResponse } from '@/service/type'

export type StockPickingList = {
  id: number | null
  code: string
  doneDate: string
}

export type Response = {
  GET: PageResponse<StockPickingList[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
    hasProductAsset: boolean
  }
}
