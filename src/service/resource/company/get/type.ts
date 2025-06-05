import { BaseResponse } from '@/service/type'

export type RequestParams = {
  GET: { id: number }
}

export type Company = {
  id: number
  code: string
  name: string
  countryId: number
  country: string
  languageId: number
  language: string
  languageCode: string
  timezone: string
  activated: boolean
  parentId: any
  parent: any
  description: string
  currencyId: number
  currency: string
  currencyFullName: string
  thousandSeparator: string
  decimalSeparator: string
  floatRounding: number
  logo: string
  phone: string
  email: string
  taxCode: string
  address: string
  symbol: string
  position: string
  bankAccountOutputs: BankAccountOutput[]
  secondaryCurrencyIds: number[]
  secondaryCurrencies: string[]
  cityId: any
  city: any
  districtId: any
  district: any
  wardId: any
  ward: any
}

export interface BankAccountOutput {
  id: number
  bankId: number
  bank: string
  addOrgId?: number
  addOrg?: string
  accountNumber: string
  accountHolder: string
}

export type Response = {
  GET: BaseResponse<Company>
}
