import { PageResponse } from '@/service/type'

export interface MaintenanceAccessoryParameter {
    id: number
    category: Category
    product: Product
    quantity: number
    uomType: string
}

export interface Category {
    id: number
    name: string
    code: string
}

export interface Product {
    id: number
    sku: string
    name: string
    imageUrls: string[]
}

export type Response = {
    GET: PageResponse<MaintenanceAccessoryParameter[]>
}

export type RequestBody = {
    GET: {
        accessoryId: number
    }
}
