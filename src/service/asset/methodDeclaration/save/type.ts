export type RequestBody = {
  SAVE: {
    code: string
    name: string
    groupStandard: {
      id: number
      name: string
      code: string
    } | null
    product: {
      id: number
      name: string
      code: string
    } | null
    isActive: boolean
  }
}
