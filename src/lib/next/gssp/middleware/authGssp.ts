import { checkTenantExits } from '@/service/uaa/tenant'
import { RedirectError, RedirectProps } from '../error'
import { GsspMiddleware } from '../type'

export const authGssp =
  (
    redirectPropsToLogin: RedirectProps = {
      permanent: false,
      destination: '/login',
    }
  ): GsspMiddleware =>
  async (...args) => {
    const token = args[0].req.cookies.ACCESS_TOKEN
    if (!token) throw new RedirectError(redirectPropsToLogin)

    const domain = args[0]?.req?.headers?.host

    if (domain && domain.includes('localhost')) {
      return [...args, true]
    }

    try {
      if (domain) {
        const { data: isTenantExists } = await checkTenantExits(domain)
        return [...args, isTenantExists]
      }
    } catch (error) {
      console.log(error)
    }
    return [...args, false]
  }
