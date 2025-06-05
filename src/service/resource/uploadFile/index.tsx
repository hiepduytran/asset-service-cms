import { authResourceApi } from '@/config/auth'

export const fileUpload = (data: any, params: any = {}) => {
  return authResourceApi({
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: '/api/v1/upload-file',
    data,
    params,
  })
}
