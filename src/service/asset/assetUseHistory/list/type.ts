import { BaseResponse, PageResponse } from '@/service/type'

export type RequestParams = {
  GET: {
    search?: string
    startDate?: string
    endDate?: string
    org?: number
    department?: number
    employee?: number
    page: number
    size: number
    around: string
  }
}

export type AssetHistoryForm = {
  search?: string
  startDate?: string
  endDate?: string
  org?: {
    id: number
  }
  department?: {
    id: number
  }
  employee?: {
    id: number
  }
  page: number
  size: number
  around: string
}

export type AssetHistoryList = {
  id: number
  assetCode: string
  productCode: string
  productName: string
  allocatedTimes: number
  recoveredTimes: number
  status: string
  assetStatus: string
}

export type AssetHistoryListDetail = {
  id: number
  startDate: string
  endDate: string
  totalDate: number
  org: string
  department: string
  employee: string
  status: string
  assetStatus: string
}

export type AssetHistoryListTime = {
  id: number
  updateDate: string
  startDate: string
  endDate: string
  totalDate: number
  assetCode: string
  productCode: string
  productName: string
  status: string
  assetStatus: string
  org: string
  department: string
  employee: string
}

export type ResponseBody = {
  AssetHistoryList: PageResponse<AssetHistoryList[]>
  AssetHistoryListDetail: BaseResponse<AssetHistoryListDetail[]>
  AssetHistoryListTime: PageResponse<AssetHistoryListTime[]>
}
