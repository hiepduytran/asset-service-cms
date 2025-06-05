import { PageResponse } from '@/service/type'

export type RequestParam = {
  LIST: {
    search?: string
    date?: string
    page: number
    size: number
    around?: string
  }
  FORM: {
    search?: string
    date?: string
    page: number
    size: number
    around: string
    isCheckboxHeader: boolean
    dataCheckbox: IncidentRecordingManageList[]
  }
}

export type IncidentRecordingManageList = {
  id: number
  date: string
  code: string
  source: string
  sourceCode: string
  productCode: string
  productName: string
  status: string
  [id: number]: boolean
}

export type Response = {
  IncidentRecordingManageListList: PageResponse<IncidentRecordingManageList[]>
}
