import { BaseResponse, PageResponse } from '@/service/type'
export type AssetRecoveryList = {
  id: number
  code: string
  requestDate: string
  updateDate: string
  allocationChooseType: string
  organization: string
  department: string
  employee: string
  quantity: number
  quantityRecall: number
  allocationStatus: string
}
export type RequestBody = {
  GET_LIST: {
    search?: string
    requestDate?: string
    desiredAllocationDate?: string
    allocationChooseType: string | null
    status: string | null
    page?: number
    size?: number
  }
  GET: {
    id: number
  }
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

export type StockPickingWarehouseReceipt = {
  id: number
  code: string
  sourceDocument: string
  pickingRequest: {
    id: number
    code: string
  }
  scheduledDate: string
  doneDate: string
  employee: {
    id: number
    code: string
    firstName: string
    lastName: string
    fullName: string
  }
  warehouse: {
    id: number
    code: string
    name: string
    isManagerLocation: boolean
    receptionSteps: string
    deliverySteps: string
  }
  location: {
    id: number
    code: string
    note: string
    type: string
    removalStrategyType: string
  }
  state: string
  quantity: number
  isSignature: boolean
  isBackOf: boolean
  numberProduct: number
  requestQty: number
  createdDate: string
}

export type StockPickingWarehouseReceiptDetail = {
  id: number
  code: string
  sourceDocument: string
  pickingRequest: {
    id: number
    code: string
  }
  orderRequest: {
    id: number
    code: string
  }
  scheduledDate: string
  doneDate: string
  warehouse: {
    id: number
    code: string
    name: string
    isManagerLocation: boolean
    receptionSteps: string
    deliverySteps: string
  }
  stockPickingType: {
    id: number
    name: string
    code: string
  }
  fromLocation: {
    id: number
    code: string
    type: string
    removalStrategyType: string
  }
  toLocation: {
    id: number
    code: string
    type: string
    removalStrategyType: string
  }
  employee: {
    id: number
    code: string
    firstName: string
    lastName: string
    fullName: string
  }
  partner: {
    id: number
    name: string
  }
  stage: {
    id: number
    name: string
  }
  state: string
  note: string
  attachFiles: {
    name: string
    url: string
  }[]

  isApproved: boolean
  numberProduct: number
  requestQty: number
  stockPickingLines: {
    id: number
    fromLocation: {
      id: number
      code: string
      type: string
      removalStrategyType: string
    }
    toLocation: {
      id: number
      code: string
      type: string
      removalStrategyType: string
    }
    destinationType: string
    product: {
      id: number
      sku: string
      name: string
      upc: string
      uom: {
        id: number
        name: string
      }
      checkingType: string
      imageUrls: string[]
      invQty: number
      configMaxInvQty: number
    }
    demandQty: number
    doneQty: number
    maxInventoryQty: number
    inventoryQty: number
    unitPrice: number
    serialLotLine: {
      location: {
        id: number
        code: string
        note: string
        type: string
        removalStrategyType: string
      }
      autoGenerateLotsSerial: boolean
      serialLots: {
        lots: {
          id: number
          code: string
        }
        lotInvQty: number
        serials: {
          id: number
          code: string
        }[]

        quantity: number
        manufacturingDate: string
        expireDate: string
        numDayExpire: number
        receiveDate: string
        unitPrice: number
        expireDateType: string
      }[]

      deleteSerialLotsIds: number[]
    }
    serialLotLineDeleteIds: number[]
    productType: string
    stage: {
      id: number
      code: string
    }
    requestLine: {
      id: number
      name: string
    }
    isOpacity: boolean
    isPickSerialLot: boolean
  }[]
}

export type Response = {
  GET: BaseResponse<AssetRecoveryDetail[]>
  GET_LIST: PageResponse<AssetRecoveryList[]>
  StockPickingWarehouseReceipt: BaseResponse<StockPickingWarehouseReceipt[]>
  StockPickingWarehouseReceiptDetail: BaseResponse<StockPickingWarehouseReceiptDetail>
}
