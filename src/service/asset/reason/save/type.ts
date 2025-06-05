export type ReasonSave = {
  code: string
  name: string
  isForeign: boolean
  isActive: boolean
  reasonLine: {
    id?: number
    system: {
      id: number
      name: string
      code: string
    } | null
    features: {
      id: number
      name: string
      code: string
    }[]
  }[]
}

export type RequestBody = {
  POST: ReasonSave
}
