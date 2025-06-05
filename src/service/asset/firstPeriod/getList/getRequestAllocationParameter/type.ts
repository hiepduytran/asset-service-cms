import { BaseResponse } from '@/service/type'

export type RequestAllocationParameter = {
    id: number,
    quantity: number,
    inventoryQuantity: number,
    staff: {
        id: number,
        code: string,
        lastName: string,
        firstName: string
    }
}

export type Response = {
    GET: BaseResponse<RequestAllocationParameter[]>
}

export type RequestBody = {
    GET: {
        allocationId: number
    }
}
