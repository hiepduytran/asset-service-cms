import { PageResponse } from '@/service/type'

export type ListOperateParam = {
  attributeCategory: {
    id: number
    name: string
    code: string
  }
  attributes: [
    {
      attribute: {
        id: number
        name: string
        code: string
      }
      attributeValue: {
        id: number
        name: string
        code: string
      }[]
      isParameter: boolean
      uom: {
        id: number
        code: string
        name: string
      }
      expectedRealization: string
      value: number
      timeRecord: string
      actionRegulation: string
      standardLevel: string
      content: string
      color: string
    }
  ]
}

export type Response = {
  GET: PageResponse<ListOperateParam[]>
}

export type RequestParam = {
  GET: {
    page?: number
    size?: number
    operateId: number
  }
}
