import { BaseResponse, PageResponse } from '@/service/type'

export type ImplementMaintenancePlanDetail = {
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
  }
  status: string

  // Trường thêm
  task_2: {
    id: number
    product: {
      id: number
      name: string
      code: string
    }
    request: string
    note: string
    task: Task[]
  }[]
}

export type TaskLineResponse = {
  id: number
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
  id: number
  name: string
  isCheck: boolean
}

export type DialogAddAccessory = {
  product: {
    id: number
    product: {
      id: number
      code: string
      name: string
    }
  }
  name: string
}

export type PutImplementMaintenancePlan = {
  planMaintenanceId: number
  planMaintenanceLineId: number
  planDescribeMaintenance: {
    id: number
    actualEndDate: string
    actualQuantityDate: number
    actualTotalPersonnel: number
    note: string
  }[]

  planGeneral: {
    replacementMaterial: {
      id: number
      usedQuantity: number
    }[]

    consumable: {
      id: number
      usedQuantity: number
    }[]
  }

  task: {
    id: number
    taskLineResponses: {
      id: number
      product: {
        id: number
        name: string
        code: string
      }
      note: string
      task: Task[]
    }[]
    doneDate: string
    assessmentType: string
    note: string
  }
  status: string
}

export type RequestBody = {
  PUT: {
    PutImplementMaintenancePlan: PutImplementMaintenancePlan
  }
}

export type AssetAccessoryList = {
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
}

export type ResponseBody = {
  GET: {
    ImplementMaintenancePlanDetail: BaseResponse<ImplementMaintenancePlanDetail>
    AssetAccessoryList: PageResponse<AssetAccessoryList[]>
  }
  PUT: {
    PutImplementMaintenancePlan: BaseResponse<{ id: number }>
  }
}
