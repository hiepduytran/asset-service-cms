import { BaseResponse, PageResponse } from '@/service/type'

export type ListJobDeclaration = {
  id: number
  product: {
    id: number
    name: string
    code: string
  }
  typeDeclaration: string
  work: number
}

export type OverView = {
  id: number
  content: string
  standardTime: number
  typeDeclaration: string
}

export type Repair = {
  id: number
  content: string
  standardTime: number
  typeDeclaration: string
}

export type RequestParam = {
  search?: string
  page: number
  size: number
}

export type ResponseBody = {
  ListJobDeclaration: PageResponse<ListJobDeclaration[]>
  ListOverView: BaseResponse<OverView[]>
  ListRepair: BaseResponse<Repair[]>
  ListAssetSKU: PageResponse<
    {
      id: number
      code: string
      name: string
    }[]
  >
}
