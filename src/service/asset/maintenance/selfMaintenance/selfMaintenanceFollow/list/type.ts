import { PageResponse } from '@/service/type'

export type ListDetailMaintenanceCard = {
  id: number
  code: string
  sku: string
  nameProduct: string
  startDate: string
  state: string
}

export type RequestParams = {
  GET: {
    ListMaintenanceCard: {
      search?: string
      page?: number
      size?: number
    }
  }
}

export type ResponseBody = {
  GET: {
    ListMaintenanceCard: PageResponse<ListDetailMaintenanceCard[]>
  }
}
