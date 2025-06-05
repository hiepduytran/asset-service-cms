import { PageResponse } from '@/service/type'

export interface Accessory {
    id: number
    product: Product
    result: string
    standardMethods: StandardMethod[]
  }
  
  export interface Product {
    id: number
    name: string
    code: string
  }
  
  export interface StandardMethod {
    id: number
    name: string
    code: string
  }
  


export type Response = {
    GET: PageResponse<Accessory[]>
}

export type RequestBody = {
    GET: {
        id : number
        standardGroupId : number
    }
}