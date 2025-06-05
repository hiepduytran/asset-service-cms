export type AssetAllocationSave = {
  id?: number | null
  code: string | null
  department: {
    id: number
    name: string
    code: string
  } | null
  dispenser: {
    id: number
    name: string
    code: string
  } | null
  productWorkshop: {
    id: number
    name: string
    code: string
  } | null
  productArea: {
    id: number
    name: string
    code: string
  } | null
  stage: {
    id: number
    name: string
    code: string
  } | null
  requestDate: Date | null
  desiredAllocationDate: Date | null
  status: string | null
  assetAllocationLine:
    | Array<{
        asset: {
          id: number
          name: string
          code: string
          sku?: string
          productId?: number 
        } | null
        productId?: number 
        assetName?: string | null
        assetQuantity: number | null
        manager: {
          id: number
          name: string
          code: string
        } | null
        quantity: number
        uom: {
          id: number
          name: string
          code?: string
        } | null
        requestQuantity: number | null
        allocationLineMap: Array<{
          id: number
          code: string
          asset: {
            id: number
            name: string
            code: string
          } | null
        }>
      }>
    | []
  source: string | null
  reason: string | null
}

export type RequestBody = {
  POST: AssetAllocationSave
}
