import { authApi } from '@/config/auth'
import { CircularProgress } from '@mui/material'
import Image, { ImageProps } from 'next/image'
import { useEffect, useState } from 'react'

export const CoreImage = ({
  alt = 'alt',
  src,
  width = 80,
  height = 80,
  ...rest
}: ImageProps) => {
  const [urlImage, setUrlImage] = useState<any>(null)
  const [loadingImage, setLoadingImage] = useState(false)

  const handleGetUrlImage = async (url: string) => {
    try {
      setLoadingImage(true)
      const res = await authApi({
        method: 'get',
        baseURL: url,
        responseType: 'blob',
      })
      setUrlImage(URL.createObjectURL(res?.data) ?? '')
      setLoadingImage(false)
    } catch (err) {
      setUrlImage(null)
      console.log('error image', err)
      setLoadingImage(false)
    }
  }

  useEffect(() => {
    typeof src === 'string' &&
      src &&
      !src.includes('?tenantId=') &&
      handleGetUrlImage(src)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])

  if (loadingImage) return <CircularProgress size='small' />

  if (urlImage)
    return (
      <Image alt={alt} src={urlImage} width={width} height={height} {...rest} />
    )

  if (
    typeof src === 'string' &&
    src &&
    src.includes('http') &&
    src.includes('?tenantId=')
  )
    return <Image alt={alt} src={src} width={width} height={height} {...rest} />

  return <Image alt={alt} src='' width={width} height={height} {...rest} />
}
