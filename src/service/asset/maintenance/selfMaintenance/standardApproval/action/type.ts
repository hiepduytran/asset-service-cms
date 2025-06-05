import { BaseResponse } from '@/service/type'
export interface StandardApproval {
    id: number,
    product: Product
    productName: string | null
    state: string
    standardMethodGroups: StandardMethodGroup[]
    checkAccountLevel: string
    checkApproveLevel: string
}

export interface Product {
    id: number
    name: string
    sku: string
    uomId: number
    uomName: string
    imageUrls: string[]
}

export interface StandardMethodGroup {
    standardGroup: StandardGroup
    standardMaintenanceLines: StandardMaintenanceLine[]
}

export interface StandardGroup {
    id: number
    name: string
    code: string
}

export interface StandardMaintenanceLine {
    id: number
    product: Product2
    result: string
    standardMethods: StandardMethod[]
    groupStaff: GroupStaff
    auditGroupStaff: AuditGroupStaff
}

export interface Product2 {
    id: number
    name: string
    code: string
}

export interface StandardMethod {
    id: number
    name: string
    code: string
}

export interface GroupStaff {
    id: number
    name: string
    code: string
}

export interface AuditGroupStaff {
    id: number
    name: string
    code: string
}


export type RequestParams = {
    GET: { id: number }
}

export type Response = {
    GET: BaseResponse<StandardApproval>
}
