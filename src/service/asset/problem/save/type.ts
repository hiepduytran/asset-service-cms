export type RequestBody = {
  SAVE: {
    id?: number | null
    code: string
    name: string
    isActive: boolean
    categoryParam: {
      id: number | null
      name: string
    } | null
  }
}
