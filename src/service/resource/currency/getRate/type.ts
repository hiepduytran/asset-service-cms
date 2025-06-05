export type CurrencyRate = {
  id: number
  currencyRateId: number
  amountSource: number
  currencySourceId: number
  currencySource: any
  amountDes: number
  currencyDesId: number
  currencyDes: any
  createdAt: string
  createdBy: string
  userInfo: any
}

export type Response = {
  GET: {
    message: string
    traceId: string
    data: CurrencyRate
  }
}

export type RequestBody = {
  GET: {
    id: number
  }
}
