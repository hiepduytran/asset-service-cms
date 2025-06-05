import { BaseResponse } from '@/service/type'

export type ResponseBody = {
  LIST: {
    StockPickingReceiptProductId: BaseResponse<
      {
        productId: number
        quantity: number
      }[]
    >
  }
}
