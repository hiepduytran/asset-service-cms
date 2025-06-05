import { PageResponse } from '@/service/type'

export interface AccessoryParameter {
    id: number
    sku: string
    name: string
    maintenanceAccessoryQuantity: number
}


export type Response = {
    GET: PageResponse<AccessoryParameter[]>
}

export type RequestBody = {
    GET: {
        maintenanceAccessoryId: number
    }
}
