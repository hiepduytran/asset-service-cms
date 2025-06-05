import { PageResponse } from '@/service/type'

export interface AccessoryParameter {
    id: number
    name: string
    lastMaintenanceDate: string
    nextMaintenanceDate: string
    frequency: string
}



export type Response = {
    GET: PageResponse<AccessoryParameter[]>
}

export type RequestBody = {
    GET: {
        maintenanceForecastId: number
    }
}
