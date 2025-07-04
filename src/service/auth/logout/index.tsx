import { authApi } from '@/config/auth'

export const postLogout = async (jti: string): Promise<any> => {
  const { data } = await authApi({
    method: 'post',
    url: '/oauth/logout',
    params: {
      jti,
    },
  })

  return data
}
