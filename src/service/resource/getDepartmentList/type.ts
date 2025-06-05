import { PageResponse } from '@/service/type'

export type Department = {
    id: number | null,
    code: string | null,
    name: string | null,
    parent: any | null,
    activated: boolean | null,
    parentId: any | null,
    departments: any[] | null
}

export type Response = {
    GET: PageResponse<Department[]>
}

export type RequestBody = {
    GET: {
        search: string | null
    }
}