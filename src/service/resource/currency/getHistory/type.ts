export type CurrencyRate = {
  id: number
  createdAt: string
  amountSource: number
  currencySourceId: number
  currencySource: any
  amountDes: number
  currencyDesId: number
  currencyDes: any
}

export type Response = {
  GET: {
    message: string
    traceId: string
    data: CurrencyRate[]
  }
}

export type RequestBody = {
  GET: {
    id: number
  }
}
