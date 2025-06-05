import { PageResponse } from '@/service/type'

export interface MaintenanceForecasting {
    id: number
    identity: string
    asset: {
        id: number,
        name: string
    }
    department: string
    lastMaintenanceDate: string
    nextMaintenanceDate: string
    forecastType: string
    status: string
    quantity: number
}


export type Response = {
    GET: PageResponse<MaintenanceForecasting[]>
}

export type RequestBody = {
    GET: {
        search: string | null
        page: number
        size: number
        departmentId: any | null
        startDate: string | null
        endDate: string | null
    }
}
