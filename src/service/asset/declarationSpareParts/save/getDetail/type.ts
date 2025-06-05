import { BaseResponse } from '@/service/type'

type AssetAccessoryDetail = {
  product: {
    id: number | null
    name: string | null
    code: string | null
    sku?: string | null
  } | null
  imageUrls: string[]
  accessoryLines:
    | Array<{
        product: {
          id: number | null
          name: string | null
          code: string | null
          sku?: string | null
        } | null
        uom: {
          id: number | null
          name: string | null
          code: string | null
        } | null
      }>
    | []
}

export type RequestParams = {
  GET: { assetAccessoryId: number }
}

export type Response = {
  GET: BaseResponse<AssetAccessoryDetail>
}
