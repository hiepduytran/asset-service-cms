export type RequestBody = {
  SAVE: {
    code: string
    entity: {
      id: number | null
      name: string
      code: string
      orderCode: string
    }
    productId: number
    name: string
    pickingId: number
    serial: {
      id: number | null
      name: string
      code: string
    }
    year: number
    country: {
      id: number | null
      name: string
      code: string
    } | null
    partner: string
    orderDate: string
    startDate: string
    endDate: string
    expiredLabel: string
    images: string[]
    parentId: number | null
    checkingType :string
    isTrackExpirationDate : boolean
    isTrackWarranty :boolean
    parameter: {
      id: number | null
      name: string
    } | null
    informationData:
      | {
          attributeCategory: {
            id: number | null
            name: string
            code: string
          }
          attributes: {
            attribute: {
              id: number | null
              name: string
              code: string
            }
            attributeValue: {
              id: number | null
              name: string
              code: string
            }
            quantity: number
            isParameter: boolean
            minimum: number
            maximum: number
            lineId: number
          }[]
        }[]
      | null

    isMaintenance: boolean
    isInsurance: boolean
    isExpiry: boolean
    isWarranty: boolean
    isRecords: boolean
    assetType: string
    insurance: {
      startDate: string
      endDate: string
      expiredLabel: string
      documentImages: {
        name: string
        url: string
      }[]
    }
    documentImages: {
      name: string
      url: string
    }[]
    records: {
      documentImages: {
        name: string
        url: string
      }[]
    }
    warranties: {
      startDate: string
      endDate: string
      expiredLabel: string
    }
    expiry: {
      startDate: string
      endDate: string
      expiredLabel: string
    }
    lot: {
      id: number
      name: string
      code: string
    }
    product: {
      id: number
      name: string
      code: string
    }
    producer: {
      id: number
      name: string
      code: string
    }
  }
}
