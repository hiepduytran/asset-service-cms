import { PageResponse } from '@/service/type'

export type RequestParam = {
  LIST: {
    search?: string
    updateDate?: string
    allocationChooseType: string | null
    status: string | null
    page: number
    size: number
  }
}

export type TransferAssetList = {
  id: number
  code: string
  updateDate: string
  allocationChooseType: string
  organization: string
  department: string
  employee: string
  quantity: number
  allocationStatus: string
}

export type ResponseBody = {
  TransferAssetList: PageResponse<TransferAssetList[]>
}
