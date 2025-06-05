import { PageResponse } from '@/service/type'

export type Asset = {
    id: number | null,
    sku: string | null,
    name: string | null,
    images: string | null,
}

export type Response = {
    GET: PageResponse<Asset[]>
}

export type RequestBody = {
    GET: {
        search: string | null
    }
}