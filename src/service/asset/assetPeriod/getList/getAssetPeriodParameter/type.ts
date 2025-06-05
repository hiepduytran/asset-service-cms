import { BaseResponse, PageResponse } from '@/service/type'

export interface AssetPeriodParameter {
    id: number
    code: string
    name: string
    period: string
    frequency: string
}

export type Response = {
    GET: PageResponse<AssetPeriodParameter[]>
}

export type RequestBody = {
    GET: {
        assetPeriodId: number
    }
}
