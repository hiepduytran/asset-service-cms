import { PageResponse } from '@/service/type'

export interface AccessoryCategory {
    id: number
    name: string
}

export type Response = {
    GET: PageResponse<AccessoryCategory[]>
}

export type RequestBody = {
    GET: {
        search: string | null
    }
}