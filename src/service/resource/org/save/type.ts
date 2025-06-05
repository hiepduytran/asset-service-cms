export type RequestBody = {
  SAVE: {
    id?: number | null
    code: string
    name: string
    taxCode: string
    phone: string
    email: string
    address: string
    logo: string | null
    parentId?: number | null
    companyId: number | null
    description?: string
    activated: boolean
    cityId: number | null
    districtId: number | null
    wardId: number | null
    isDefault: boolean
  }
  GET: {
    id: number
  }
}
