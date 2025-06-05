export type InitialAllocatedAssetsSave = {
  code: string
  updateDate: string
  requestDate: string
  allocationChooseType: string
  organization: {
    id: number
    name: string
    code?: string
  } | null
  department: {
    id: number
    name: string
    code: string
  } | null
  employee: {
    id: number
    name: string
    code: string
  } | null
  assetAllocationLine: {
    product: {
      id: number
      name: string
      code: string
      category: {
        id: number
      }
    } | null
    sku?: string
    assetName?: string
    quantity: number
    uom: {
      id: number
      name: string
      code?: string
    } | null
    requestQuantity: number
    allocationLineMap: {
      id?: number
      asset: {
        code: string
        entity: {
          id: number
          name: string
          code: string
        } | null
        serial: {
          id: number
          name: string
          code: string
        } | null
        country: {
          id: number
          name: string
          code: string
        } | null
        partner: {
          id: number
          name: string
          code: string
        } | null
        producer: {
          id: number
          name: string
          code: string
        } | null
        orderDate: string
        startDate: string
        expiredLabel: string
        lot: {
          id: number
          name: string
          code: string
        } | null
        lotName?: string
        product: {
          id: number
          name: string
          sku: string
          uomId: number
          uomName: string
        } | null
      }
    }[]
  }[]
}
export type RequestBody = {
  POST: InitialAllocatedAssetsSave
}
