export type RequestBody = {
  SAVE: {
    currencyId?: number | null
    name: string
    alias: string
    symbol: string
    fullName: string
    position: string
    rounding: number
    isMainCurrency: boolean
    rate: number
    currencyMin: string
    hasMainCurrency: boolean
    activated: boolean
  }
}
