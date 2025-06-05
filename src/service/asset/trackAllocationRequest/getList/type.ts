import { BaseResponse, PageResponse } from '@/service/type'
export type TrackAllocationRequestList = {
  id: number
  code: string
  requestDate: string
  updateDate: string
  note: string
  allocationChooseType: string
  organization: string
  department: string
  employee: string
  requestQuantity: number
  allocatedQuantity: number
  allocationStatus: string
}

export type StockPickingDelivery = {
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
  stockPickingDeliveryDetail: StockPickingDeliveryDetail
}
export type StockPickingDeliveryDetail = {
  id: number
  code: string
  scheduledDate: string
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
  }
  sourceDocument: string
  note: string
  state: string
  stockPickingLines: {
    id: number
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
    inventories: {
      fromLocation: {
        id: number
        code: string
        note: string
        type: string
        removalStrategyType: string
      }
      quantityInventory: number
      doneQty: number
      isPickSerialLot: boolean
      serialLotDelivery: {
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
      toLocation: {
        id: number
        code: string
        note: string
        type: string
        removalStrategyType: string
      }
    }[]

    itemPrices: {
      quantity: number
      unitPrice: number
      receiveDate: string
    }[]
  }[]

  asset?: AllocationRequestAssetList
}

export type AllocationRequestAssetList = {
  id: number
  code: string
  name: string
  quantity: number
  uom: {
    id: number
    name: string
    code: string
  }
  asset: {
    id: number
    code: string
    isImageInDb: boolean
    lots: {
      id: number
      name: string
      code: string
    }
    serial: string
    imageUrls: string[]
  }[]
}

export type Response = {
  GET: PageResponse<TrackAllocationRequestList[]>
  StockPickingDelivery: BaseResponse<StockPickingDelivery[]>
  StockPickingDeliveryDetail: BaseResponse<StockPickingDeliveryDetail>
  AllocationRequestAssetList: BaseResponse<AllocationRequestAssetList>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
    requestDate?: string | null
    desiredAllocationDate?: string | null
    allocationChooseType?: string | null
    status?: string | null
  }
}
