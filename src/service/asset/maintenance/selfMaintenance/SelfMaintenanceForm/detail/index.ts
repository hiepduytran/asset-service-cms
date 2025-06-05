export type DetailProduct = {
  assetId: number
  id: number
  sku: string
  name: string
  imageUrls: string[]
  standardMethodGroups?: {
    standardGroup: {
      id: number
      name: string
      code: string
    }
    check: boolean
  }[]
}
