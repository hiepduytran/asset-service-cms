export type addOrgesDTO = {
  id?: number
  code?: string
  name?: string
}

export type RequestBody = {
  POST: {
    code?: string
    name: string
    description?: string
    activated?: boolean
    addOrges?: Array<addOrgesDTO>
    deleteaddOrges?: number[]
  }
}
