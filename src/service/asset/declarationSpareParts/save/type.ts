export type AssetAccessorySave = {
  id: number | null
  product: {
    id: number | null
    name: string | null
    code: string | null
    imageUrls?: string[]
    sku?: string | null
  } | null
  productName?: string | null
  imageUrls?: string[]
  accessoryLines:
    | Array<{
        id?: number | null
        product: {
          id: number | null
          name: string | null
          code: string | null
          sku?: string | null
        } | null
        productName?: string | null
        quantity: number | null
        uom: {
          id: number | null
          name: string | null
          code: string | null
        } | null
        uomName?: string | null
      }>
    | []
  accessoryLinesLength?: number
  listDeleteIds?: number[]
}

export type RequestBody = {
  POST: AssetAccessorySave
}
