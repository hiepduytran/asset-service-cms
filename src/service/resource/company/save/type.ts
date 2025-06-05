export type RequestBody = {
  SAVE: {
    id?: number | null
    code: string
    name: string
    logo: string
    phone: string
    email: string
    address: string
    taxCode: string
    parentId?: number | null
    countryId: number | null
    languageId: number | null
    description?: string
    timezone: string
    currencyId: number | null
    secondaryCurrencyIds: number[]
    thousandSeparator: string | null
    decimalSeparator: string | null
    floatRounding?: number | null
    activated: boolean
    cityId: number | null
    districtId: number | null
    wardId: number | null
  }
  GET: {
    id: number
  }
}
