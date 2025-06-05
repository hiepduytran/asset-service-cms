import { PageResponse } from "@/service/type"

export type DetailAccessory = {
    id?: number
    product: {
        id?: number
        name: string
        code: string
    }
}

export type Response = {
    GET: PageResponse<DetailAccessory[]>
}

export type RequestBody = {
    GET: {
        productId?: number
    }
}