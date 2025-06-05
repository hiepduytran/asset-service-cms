import { postLogout } from '@/service/auth/logout'
import { postRefreshToken } from '@/service/auth/refreshToken'
import { toastError } from '@/toast'
import axios from 'axios'
import getConfig from 'next/config'
import queryString from 'query-string'
import {
  getCmsToken,
  getJtiToken,
  getOrgIdToken,
  removeCmsToken,
  setCmsToken,
} from './token'

const {
  publicRuntimeConfig: { TENANT_NAME, SUBDOMAIN },
} = getConfig()

export const requestAuth = axios.create({
  timeout: 26405,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: {
    serialize: (params: any) =>
      queryString.stringify(params, {
        arrayFormat: 'comma',
        skipNull: true,
        skipEmptyString: true,
      }),
  },
})

export const logoutAccount = async () => {
  try {
    const jti = getJtiToken()
    if (jti) await postLogout(jti)
  } catch (error) {
    console.log(error)
  } finally {
    localStorage.clear()
    sessionStorage.clear()
    removeCmsToken()
    window.location.replace('/asset/login')
  }
}

const middlewareRequest = async (config: any) => {
  const tokenAccess = getCmsToken()

  const baseHeaders = {
    'Accept-Language': 'vi',
    'Current-Domain': window.location.origin.includes('localhost')
      ? `${TENANT_NAME}${SUBDOMAIN}`
      : window.location.origin.replace(/^https?:\/\//, ''),
    ...(localStorage.getItem('isDemoMode') === 'true'
      ? { 'DEMO': 1 }
      : {}),
  }

  if (config?.url) {
    const configUrl = config.url

    if (
      (configUrl.includes('/oauth') && !configUrl.includes('/oauth/logout')) ||
      configUrl.includes('/public-api')
    ) {
      return {
        ...config,
        headers: {
          ...config.headers,
          ...baseHeaders,
        },
      }
    }
  }

  return {
    ...config,
    headers: {
      ...config.headers,
      ...baseHeaders,
      Authorization: `Bearer ${tokenAccess?.accessToken}`,
    },
  }
}

let isRefreshing = false
let refreshSubscribers: any = []

const middlewareResponseError = async (error: any) => {
  const { config, response } = error
  const originalRequest = config

  const status = response?.status

  if (!status || status === 500 || status === 503 || status === 400) {
    // window.location.replace('/500')
  }

  if (
    status === 401 &&
    !config.url.includes('/oauth') &&
    !originalRequest._retry
  ) {
    if (!isRefreshing) {
      isRefreshing = true

      const tokenAccess = getCmsToken()
      const orgId = getOrgIdToken()

      if (tokenAccess?.refreshToken && orgId) {
        postRefreshToken(tokenAccess.refreshToken, orgId)
          .then((res) => {
            isRefreshing = false
            if (res?.data?.accessToken) {
              setCmsToken(res.data)
            }
            refreshSubscribers.map((su: any) => {
              su(res.data.accessToken)
            })
          })
          .catch(() => {
            logoutAccount()
          })
      } else {
        await logoutAccount()
      }
    }

    return new Promise((resolve, _) => {
      refreshSubscribers.push((accessToken: string) => {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        resolve(axios(originalRequest))
      })
    })
  } else if (status === 403) {
    toastError('Bạn không có quyền thực hiện tính năng này.')
  }

  return Promise.reject(error)
}

requestAuth.interceptors.request.use(middlewareRequest, (error) =>
  Promise.reject(error)
)

requestAuth.interceptors.response.use((res) => {
  const { data } = res

  if (data?.errorCodes) return Promise.reject(data?.errorCodes)

  return res
}, middlewareResponseError)
