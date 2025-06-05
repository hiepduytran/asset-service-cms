export type RequestBodyBank = {
  SAVE: {
    id?: number
    code: string
    name: string
    description: string
    activated: boolean
    logoUrl: string
    bankOrges: Array<{
      id?: number
      code: string
      name: string
    }>
    deleteBankOrges: Array<number>
  }
}
