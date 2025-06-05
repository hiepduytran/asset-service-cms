export type JobDeclarationAction = {
  product: {
    id: number
    sku: string
    name: string
  }
  typeDeclaration: string
  note: string
  maintenanceWorkOverview: {
    maintenanceWorkDetails: {
      content: string
      standardTime: number | null
    }[]
  }
  maintenanceWorkRepair: {
    maintenanceWorkDetails: {
      content: string
      standardTime: number | null
    }[]
  }
  detailsWorkOverview: {
    product: {
      id: number
      name: string
      code: string
    }
    repairWorkDetails: {
      content: string
      standardTime: number | null
    }[]
  }
  detailsWorkRepair: {
    product: {
      id: number
      name: string
      code: string
    }
    repairWorkDetails: {
      content: string
      standardTime: number | null
    }[]
  }
}

export type JobDeclarationDetail = {
  id?: number
  product: {
    id?: number
    code: string
    name: string
  } | null
  typeDeclaration: string
  note: string
  maintenanceWorkOverview: {
    maintenanceWorkDetails: {
      content: string
      standardTime: number | null
    }[]
  } | null

  maintenanceWorkRepair: {
    maintenanceWorkDetails: ({
      content: string
      standardTime: number | null
    } | null)[]
  } | null

  detailsWorkOverview: ({
    product: {
      id?: number
      name: string
      code: string
    } | null
    repairWorkDetails: ({
      content: string
      standardTime: number | null
    } | null)[]
  } | null)[]

  detailsWorkRepair: ({
    product: {
      id: number
      name: string
      code: string
    } | null
    repairWorkDetails: ({
      content: string
      standardTime: number | null
    } | null)[]
  } | null)[]
}
