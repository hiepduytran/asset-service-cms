import { PageResponse } from '@/service/type'

export type RequestParamBank = {
  GET: {
    search?: string
    activated?: boolean | null
    page: number
    size: number
  }
  DELETE: {
    bankId: number
  }
  GET_DETAIL: {
    bankId: number
  }
}

export type BankListType = {
  id: number
  code: string
  name: string
  description: string
  activated: boolean
  logoUrl: string
  bankOrges: Array<{
    id: number
    code: string
    name: string
  }>
}[]

export type ResponseBankList = {
  GET: PageResponse<BankListType>
}
