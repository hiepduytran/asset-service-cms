import { PageResponse } from '@/service/type'

export interface Accessory {
    id: number
    product: Product
}

export interface Product {
    id: number
    name: string
    code: string
}


export type Response = {
    GET: PageResponse<Accessory[]>
}

export type RequestBody = {
    GET: {
        productId: number | null
    }
}