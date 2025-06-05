import { Token } from '@/service/auth/login/type'
import cookie from 'js-cookie'
import getConfig from 'next/config'
import { parseJwt } from '@/helper/parseJwt'

const {
  publicRuntimeConfig: { SUBDOMAIN },
} = getConfig()

export function getUserIdToken() {
  try {
    const accessToken = getCmsToken()
    if (accessToken?.userId) return accessToken?.userId

    if (accessToken?.accessToken)
      return parseJwt(accessToken?.accessToken).user_id

    return null
  } catch (e) {
    console.warn('userId không hợp lệ:', e)
    return null
  }
}

export const getOrgIdToken = () => {
  try {
    const accessToken = getCmsToken()
    if (accessToken?.orgId) return accessToken?.orgId

    if (accessToken?.accessToken)
      return parseJwt(accessToken?.accessToken).org_id

    return null
  } catch (e) {
    console.warn('orgId không hợp lệ:', e)
    return null
  }
}

export const getJtiToken = () => {
  try {
    const accessToken = getCmsToken()
    if (accessToken?.jti) return accessToken?.jti

    if (accessToken?.accessToken) return parseJwt(accessToken?.accessToken).jti

    return null
  } catch (e) {
    console.warn('Jti không hợp lệ:', e)
    return null
  }
}

export const getCmsToken = (): Token | null => {
  try {
    const val = cookie.get('ACCESS_TOKEN')
    if (val) return JSON.parse(val)
    return null
  } catch (e) {
    console.warn('Token không phải là JSON hợp lệ:', e)
    return null
  }
}

export const setCmsToken = (val: any) => {
  if (window.location.origin.includes('localhost')) {
    return cookie.set('ACCESS_TOKEN', JSON.stringify(val))
  }
  return cookie.set('ACCESS_TOKEN', JSON.stringify(val), {
    domain: SUBDOMAIN,
  })
}

export const removeCmsToken = () => {
  cookie.remove('ACCESS_TOKEN')
  cookie.remove('ACCESS_TOKEN', {
    domain: SUBDOMAIN,
  })
}
