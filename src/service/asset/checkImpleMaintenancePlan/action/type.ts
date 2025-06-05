import { BaseResponse } from '@/service/type'

export type ImplementMaintenancePlanCheckDetail = {
  id: number
  parentId: number
  code: string
  name: string
  plantType: string
  timeOccurred: string
  startDate: string
  doneDate: string
  reason: string
  describeStatus: string
  assetAccessoryId: number
  asset: {
    id: number
    name: string
    code: string
  }
  department: {
    id: number
    name: string
    code: string
  }
  accessories: {
    asset: {
      id: number
      name: string
      code: string
    }
    uom: {
      id: number
      name: string
      code: string
    }
    quantity: number
    problem: string
    chooseType: string
  }[]

  planDescribeMaintenance: {
    id: number
    product: {
      id: number
      name: string
      code: string
    }
    content: string
    implementer: string
    supportPerson: string
    auditStaffFirst: string
    auditStaffSecond: string
    numberResources: number
    startDate: string
    endDate: string
    actualEndDate: string
    actualQuantityDate: number
    actualTotalPersonnel: number
    note: string
  }[]

  planGeneral: {
    replacementMaterial: {
      id: number
      product: {
        id: number
        name: string
        code: string
      }
      uom: {
        id: number
        name: string
        code: string
      }
      receivedQuantity: number
      usedQuantity: number
      productType: string
    }[]

    consumable: {
      id: number
      product: {
        id: number
        name: string
        code: string
      }
      uom: {
        id: number
        name: string
        code: string
      }
      receivedQuantity: number
      usedQuantity: number
      productType: string
    }[]
  }
  task: {
    id: number
    taskLineResponses: TaskLineResponse[]
    doneDate: string
    assessmentType: string
    note: string
    checkFirst: {
      assessmentType: string
      checkDate: string
      note: string
    }
    checkSecond: {
      assessmentType: string
      checkDate: string
      note: string
    }
  }
  currentLevel: 'LEVEL_1' | 'LEVEL_2'
  checkStatus: 'NOT_TESTED' | 'PASSED_FIRST' | 'NOT_PASSED' | 'PASSED_SECOND'
  status: string
}

export type TaskLineResponse = {
  product: {
    id: number
    name: string
    code: string
  }
  request: string
  note: string
  task: Task[]
}

export type Task = {
  name: string
  isCheck: boolean
  checkFirst: boolean
  checkSecond: boolean
}

export type PutImplementMaintenancePlanCheck = {
  planMaintenanceId: number
  planMaintenanceLineId: number

  task: {
    id: number
    taskLineResponses: {
      task: Task[]
    }[]
  }
  checkFirst: {
    assessmentType: string
    checkDate: string
    note: string
  }
  checkSecond: {
    assessmentType: string
    checkDate: string
    note: string
  }
  checkStatus: string
}

export type RequestBody = {
  PUT: {
    PutImplementMaintenanceCheckPlan: PutImplementMaintenancePlanCheck
  }
}

export type ResponseBody = {
  GET: {
    ImplementMaintenancePlanCheckDetail: BaseResponse<ImplementMaintenancePlanCheckDetail>
    // AssetAccessoryList: PageResponse<AssetAccessoryList[]>
  }
  PUT: {
    PutImplementMaintenanceCheckPlan: BaseResponse<{ id: number }>
  }
}
