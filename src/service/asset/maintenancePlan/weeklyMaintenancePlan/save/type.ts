export type WeeklyMaintenancePlanSave = {
  id?: number | null
  code: string
  name: string
  plantType: string
  planDate: string
  endPlanDate?: string
  timeOccurred: string | null
  describeStatus: string
  propose: string
  approveEnum: string
  planLine: {
    sku?: {
      productId?: number | null
    } | null
    assetName?: string
    department: {
      id: number | null
      name: string
      code: string
    } | null
    asset: {
      id: number | null
      name: string
      sku: string
      code: string
    } | null
    note: string
  }[]
  planConfig: {
    asset: {
      id: number | null
      name: string
      code: string
    } | null
    department: {
      id: number | null
      name: string
      code: string
    } | null
    planConfigMaintenance: {
      id?: number | null
      accessoryId?: number | null
      uomName?: string
      maintenanceAccessory: {
        id: number | null
        accessoryId?: number | null
        name: string
        code: string
      } | null
      uom: {
        id: number | null
        name: string
        code: string
      } | null
      quantity: number
      problem: string
      chooseType: string | null
      planConfigLine: {
        uomName?: string
        type?: string
        factoryQty: number
        internalQty: number
        product: {
          id: number | null
          name: string
          code: string
        } | null
        uom: {
          id: number | null
          name: string
          code: string
        } | null
        quantity: number
      }[]
    }[]
  }[]
  planDescribe: {
    asset: {
      id: number | null
      name: string
      code: string
    } | null
    department: {
      id: number | null
      name: string
      code: string
    } | null
    frequencyRecommendation: number | null
    frequencyReality: number | null
    frequencyType?: string
    content: string
    responsiblePerson: {
      id: number | null
      name: string
      code: string
    } | null
    startDate: string
    endDate: string
    planDescribeMaintenance: {
      product: {
        id: number | null
        name: string
        code: string
      } | null
      productName?: string
      content: string
      implementer: string
      supportPerson: string
      numberResources: number
      startDate: string
      endDate: string
      lastMaintenanceDate: string
      quantityDate: number
      totalPersonnel: number
      note: string
      auditRoleFirst: {
        id: number | null
        name: string
        code: string
      }
      auditRoleSecond: {
        id: number | null
        name: string
        code: string
      }
    }[]
  }[]
  planGeneral: {
    replacementMaterial: {
      product: {
        id: number | null
        name: string
        code: string
      } | null
      uom: {
        id: number | null
        name: string
        code: string
      } | null
      requestQuantity: number
      quantityFactoryInventory: number
      quantityCompanyInventory: number
      quantityRequestAllocation: number
      usedQuantity: number
      receivedQuantity: number
      productType: string
    }[]
    consumable: {
      product: {
        id: number | null
        name: string
        code: string
      } | null
      uom: {
        id: number | null
        name: string
        code: string
      } | null
      requestQuantity: number
      quantityFactoryInventory: number
      quantityCompanyInventory: number
      quantityRequestAllocation: number
      usedQuantity: number
      receivedQuantity: number
      productType: string
    }[]
  }
  checkAccountLevel: string
  checkApproveLevel: string
}

export type RequestBody = {
  POST: WeeklyMaintenancePlanSave
}
