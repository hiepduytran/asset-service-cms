import { PageResponse } from '@/service/type'

export type List2Product = {
  id: number
  uom: {
    id: number
    name: string
  }
  name: string
  sku: string
  uomId: number
  uomName: string
}

export type ResponseBody = {
  GET: {
    List2Product: PageResponse<List2Product[]>
  }
}
