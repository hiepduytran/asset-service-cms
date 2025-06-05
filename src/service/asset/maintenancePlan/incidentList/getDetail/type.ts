import { PageResponse } from '@/service/type'

export type IncidentListDetail = {
  accessory: {
    id: number
    name: string
  }
  status: string
}

export type Response = {
  GET: PageResponse<IncidentListDetail[]>
}

export type RequestBody = {
  GET: {
    assetId: number
    cardId: number
    currentShiftId?: number
  }
}
