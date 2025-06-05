import { BaseResponse } from '@/service/type'

export type TransferAssetDetail = {
  id: number
  code: string
  transferDate: string
  allocationChooseType: string
  collector: {
    id: number
    name: string
    code: string
  } | null
  organization?: {
    id: number
    name: string
    code?: string
  }
  department?: {
    id: number
    name: string
    code: string
  }
  employee?: {
    id: number
    name: string
    code: string
  }
  reasonRecall: {
    id: number
    name: string
    code: string
  } | null
  feature: {
    id: number
    name: string
    code: string
  } | null
  reference: {
    id: number
    name: string
    code: string
  } | null
  note: string
  uploadSignature?: {
    name: string
    url: string
  }[]
  status: string
  asset: {
    assetIdentity: {
      id: number
      code: string
    } | null
    product: {
      id: number
      name: string
      code: string
    } | null
    recordConditionType: string | null
    handlingPlanType: string | null
    allocationChooseType: string | null
    organization: {
      id: number
      name: string
      code?: string
    } | null
    department: {
      id: number
      name: string
      code: string
    } | null
    employee: {
      id: number
      name: string
      code: string
    } | null
  }[]
  documentImages: { name: string; url: string }[]
}

export type PostTransferAsset = {
  id: number
  code: string
  transferDate: string
  allocationChooseType: string
  collector: {
    id: number
    name: string
    code: string
  } | null
  organization?: {
    id: number
    name: string
    code?: string
  }
  department?: {
    id: number
    name: string
    code: string
  }
  employee?: {
    id: number
    name: string
    code: string
  }
  reasonRecall: {
    id: number
    name: string
    code: string
  } | null
  feature: {
    id: number
    name: string
    code: string
  } | null
  reference: {
    id: number
    name: string
    code: string
  } | null
  note: string
  uploadSignature?: string
  status: string
  asset: {
    assetIdentity: {
      id: number
      code: string
    } | null
    product: {
      id: number
      name: string
      code: string
    } | null
    recordConditionType: string | null
    handlingPlanType: string | null
    allocationChooseType: string | null
    organization: {
      id: number
      name: string
      code?: string
    } | null
    department: {
      id: number
      name: string
      code: string
    } | null
    employee: {
      id: number
      name: string
      code: string
    } | null
  }[]
  documentImages: { name: string; url: string }[]
}

export type IncidentDetail = {
  id: number
  code: string
  recordDate: string
  recorder: {
    id: number
    name: string
    code: string
  } | null
  collector: {
    id: number
    name: string
    code: string
  } | null
  source: string
  sourceCode: string
  allocationChooseType: string
  org?: {
    id: number
    name: string
    code?: string
  }
  department?: {
    id: number
    name: string
    code: string
  }
  employee?: {
    id: number
    name: string
    code: string
  }
  note: string
  // allocationStatus: string
  asset: {
    assetIdentity: {
      id?: number
      code: string
    } | null
    product: {
      id?: number
      name: string
      code: string
    } | null
    recordConditionType: string | null
    handlingPlanType: string | null
  }[]
}

export type AssetRecoveryDetail = {
  assetIdentity: string
  asset: {
    id: number
    name: string
    code: string
  }
  status: string
}

export type ResponseBody = {
  TransferAssetDetail: BaseResponse<TransferAssetDetail>
  AssetRecoveryDetail: BaseResponse<AssetRecoveryDetail[]>
}
