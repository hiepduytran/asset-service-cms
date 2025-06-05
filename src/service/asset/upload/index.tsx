import { authAssetApi } from '@/config/auth'

export const fileUpload = (data: FormData) => {
  return authAssetApi({
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: '/api/v1/upload-file',
    data,
  })
}
