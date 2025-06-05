import { authApi } from '@/config/auth'

export const postRefreshToken = async (
  refreshToken: string,
  orgId: number | null
): Promise<any> => {
  const { data } = await authApi({
    method: 'post',
    url: '/oauth/refresh-token',
    data: {
      refreshToken,
      orgId,
    },
  })

  return data
}
