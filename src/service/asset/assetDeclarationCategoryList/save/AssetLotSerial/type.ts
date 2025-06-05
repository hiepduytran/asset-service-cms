import { BaseResponse } from '@/service/type'

export type AssetLotSerial = {
  pickIns: {
    id: number | null
    code: string
    name: string
    quantity: number
    quantityIdentified: number
    asset: {
      id: number | null
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
      product: {
        id: number
        name: string
        sku: string
        uomId: number
        uomName: string
      } | null
      uom: {
        id: number
        name: string
        code: string
      } | null
      category: {
        id: number
        name: string
        code: string
      } | null
      quantityIdentified: number
      quantityUnidentified: number
      quantityPickIn: number
      quantity: number
      quantityAsset: number
    }[]
  }[]
}

export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<AssetLotSerial>
}

export type RequestBody = {
  POST: AssetLotSerial
}
