export type RequestBody = {
  SAVE: {
    id?: number | null
    code: string
    name: string
    isActive: boolean
    createdDate: Date | null
  }
}
