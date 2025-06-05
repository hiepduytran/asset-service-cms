import { AxiosRequestConfig } from 'axios'
import { requestAuth } from '@/config/axios'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: {
    APUS_URL,
    AUTH_URL,
    UAA_URL,
    RESOURCE_URL,
    PRODUCT_URL,
    PO_URL,
    SO_URL,
    WAREHOUSE_URL,
    ACCOUNTING_URL,
    DMS_URL,
    MANUFACTORY_URL,
    ASSET_URL,
    HRM_URL,
    FINANCE_URL,
    PRESENT_URL,
    CONTRACT_URL,
    DRIVER_URL,
    QMS_URL,

  },
} = getConfig()

export const authApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: AUTH_URL,
    ...options,
  })
}

export const authApusApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: APUS_URL,
    ...options,
  })
}

export const authUaaApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: UAA_URL,
    ...options,
  })
}

export const authResourceApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: RESOURCE_URL,
    ...options,
  })
}

export const authProductApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: PRODUCT_URL,
    ...options,
  })
}

export const authWarehouseApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: WAREHOUSE_URL,
    ...options,
  })
}

export const authSOApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: SO_URL,
    ...options,
  })
}

export const authPOApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: PO_URL,
    ...options,
  })
}


export const authDmsApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: DMS_URL,
    ...options,
  })
}

export const authAccApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: ACCOUNTING_URL,
    ...options,
  })
}

export const authManuApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: MANUFACTORY_URL,
    ...options,
  })
}

export const authAssetApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: ASSET_URL,
    ...options,
  })
}

export const authHrmApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: HRM_URL,
    ...options,
  })
}

export const authFinanceApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: FINANCE_URL,
    ...options,
  })
}

export const authPresentApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: PRESENT_URL,
    ...options,
  })
}

export const authContractApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: CONTRACT_URL,
    ...options,
  })
}

export const authDriverApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: DRIVER_URL,
    ...options,
  })
}

export const authQmsApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: QMS_URL,
    ...options,
  })
}

