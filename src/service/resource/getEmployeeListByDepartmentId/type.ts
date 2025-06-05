import { BaseResponse, PageResponse } from '@/service/type'

export type Employee = {
    id: number | null,
    imageUrl: string | null,
    code: string | null,
    lastName: string | null,
    firstName: string | null,
    department: {
        id: number,
        name: string
    } | null,
    position: {
        id: number,
        name: string
    } | null,
    parentDepartment: {
        id: number,
        name: string
    } | null,
    birthday: string | null,
    gender: string | null,
    phoneNumber: string | null,
    email: string | null,
    activated: true | null,
    departmentId: number | null,
    positionId: number | null,
    name: string | null,
    departments: {
        id: number,
        name: string
    }[] | null,
    positions: {
        id: number,
        name: string
    }[] | null
}

export type Response = {
    GET: PageResponse<Employee[]>
}

export type RequestBody = {
    GET: {
        search: string | null
        departmentIds: number[] | null
    }
}