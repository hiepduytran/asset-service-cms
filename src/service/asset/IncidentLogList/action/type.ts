export type IncidentDetailAction = {
    id?: number
    code: string
    recordDate: string
    recorder: {
      id: number
      name: string
      code: string
    } | null
    allocationChooseType: string
    org?: {
      id: number
      name: string
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
      id?: number
      name: string
      code: string
    } | null
    reference: {
      id?: number
      name: string
      code: string
    } | null
    note: string
    asset: {
      assetIdentity: {
        id: number
        name: string
        code: string
      } | null
      product: {
        id: number
        name: string
        code: string
      } | null
      productId?: number
      incidentRecodingIds: number[]
      handlingPlanType: string
    }[]
  }
