import { authAssetApi } from '@/config/auth'

export const putUploadImage = async (
  requestBody: (
    | {
        assetId: number
        cardId: number
        urlImages: string[]
      }
    | undefined
  )[]
) => {
  return await authAssetApi({
    method: 'put',
    url: '/api/v1/asset/upload/image',
    data: requestBody,
  })
}

export const fileUploadAsset = (data: any) => {
  return authAssetApi({
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: '/api/v1/upload',
    data,
    // params: { featureAlias: 'asset_document' },
  })
}
