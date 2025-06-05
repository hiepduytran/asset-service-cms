import { PageResponse } from '@/service/type'

export interface UomGroupOutput {
  id: number
  code: string
  name: string
  originalUnitId: number
  originalUnitOutput: OriginalUnitOutput
  unitGroupLineOutputList: UnitGroupLineOutputList[]
}

export interface OriginalUnitOutput {
  id: number
  code: string
  name: string
  description: string
  activated: boolean
  companyId: number
  orgId: number
  isUsing: boolean
}

export interface UnitGroupLineOutputList {
  accuracy: number
  code: string
  conversionRate: number
  id: number
  isUsing: boolean
  unitGroupId: number
  unitId: number
  unitName: string
  uomLineType: string
}

export type Product = {
  id: number
  name: string
  uomId: number
  uomOutput: {
    id: number
    code: string
    name: string
  }
  uomGroupOutput: UomGroupOutput

  // productTemplateOutputDto: {
  //   id: number
  //   hasVariant: boolean
  //   sku: string
  //   upc: string
  //   name: string
  //   productCategoryId: number
  //   productCategoryName: string
  //   uomCode: string
  //   productCategoryOutputDto: {
  //     id: number
  //     code: string
  //     name: string
  //     imageUrl: string
  //     parentId: number
  //     parentName: string
  //     description: string
  //     activated: boolean
  //     type: string
  //     variants: [
  //       {
  //         id: number
  //         code: string
  //         name: string
  //         displayType: string
  //         companyId: number
  //         orgId: number
  //         priceVariationValue: [
  //           {
  //             id: number
  //             sequence: number
  //             value: string
  //             companyId: number
  //             orgId: number
  //             productAttributeId: number
  //             isDelete: boolean
  //           }
  //         ]
  //       }
  //     ]
  //     attributes: [
  //       {
  //         id: number
  //         code: string
  //         name: string
  //         description: string
  //         sequence: number
  //         activated: boolean
  //         companyId: number
  //         orgId: number
  //         isInternal: boolean
  //       }
  //     ]
  //     attributeIds: [number]
  //     variantIds: [number]
  //   }
  //   productBrandOutput: {
  //     id: number
  //     code: string
  //     name: string
  //     imageUrl: string
  //     description: string
  //     activated: boolean
  //     type: string
  //     companyId: number
  //     orgId: number
  //   }
  //   productTagOutputDtos: [
  //     {
  //       id: number
  //       code: string
  //       name: string
  //       activated: boolean
  //       companyId: number
  //       orgId: number
  //     }
  //   ]
  //   productTaxS: [
  //     {
  //       id: number
  //       code: string
  //       name: string
  //       description: string
  //       activated: boolean
  //     }
  //   ]
  //   managementForm: string
  //   imageUrls: [string]
  //   brandId: number
  //   description: string
  //   purchaseOk: boolean
  //   saleOk: boolean
  //   skuSuffixEnable: boolean
  //   hasAttributes: boolean
  //   attributeCategoryIds: [number]
  //   attributeValueOutputDtos: [
  //     {
  //       id: number
  //       sequence: number
  //       value: string
  //       companyId: number
  //       orgId: number
  //       productAttributeId: number
  //       isDelete: boolean
  //     }
  //   ]
  //   vendorByTemplatesOutpuDtos: [
  //     {
  //       vendorOutputDto: {
  //         id: number
  //         code: string
  //         name: string
  //         description: string
  //         activated: boolean
  //         companyId: number
  //         orgId: number
  //       }
  //       vendorSku: string
  //     }
  //   ]
  //   productVariants: [
  //     {
  //       id: number
  //       name: string
  //       sku: string
  //       upc: string
  //       parentId: number
  //       imageUrls: [string]
  //       companyId: number
  //       orgId: number
  //       activated: boolean
  //       attributeValueOutputList: [
  //         {
  //           id: number
  //           sequence: number
  //           value: string
  //           companyId: number
  //           orgId: number
  //           productAttributeId: number
  //           isDelete: boolean
  //         }
  //       ]
  //       uomCode: string
  //       productPrice: number
  //       cost: number
  //     }
  //   ]
  //   activated: boolean
  //   defaultVendorSku: string
  //   productPrice: number
  //   cost: number
  //   orgId: number
  //   companyId: number
  //   sequence: number
  //   type: string
  //   listPrice: number
  //   avco: number
  //   isInternal: boolean
  // }
  // sku: string
  // upc: string
  // productTagDtoOutput: {
  //   id: number
  //   code: string
  //   name: string
  //   activated: boolean
  //   companyId: number
  //   orgId: number
  // }
  // parentId: number
  // imageUrls: [string]
  // companyId: number
  // orgId: number
  // activated: boolean
  // uomCode: string
  // productPrice: number
  // cost: number
  // purchaseOk: boolean
  // saleOk: boolean
  // uomName: string
}

export type Response = {
  GET: PageResponse<Product[]>
}

export type RequestBody = {
  GET: {
    page: number
    size: number
    search?: string
    ids?: number[]
    categoryId?: number
    activated?: boolean
    locationId?: number
    checkingType?: string
  }
}
