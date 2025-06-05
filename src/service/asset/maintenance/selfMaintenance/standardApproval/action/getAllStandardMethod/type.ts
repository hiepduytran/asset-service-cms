import { PageResponse } from "@/service/type"


export type DetailStandardMethod = {
    id?: number
    code: string
    name: string
    groupStandard: {
        id: number
        name: string
        code: string
    }
    product: null
    isActive: boolean
}

export type RequestBody = {
    GET: {
        search: string | null
    }
}

export type Response = {
    GET: PageResponse<DetailStandardMethod[]>
}